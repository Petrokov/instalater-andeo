'use server'

import { headers } from 'next/headers'
import { createServerClient } from '@/lib/supabase-server'
import type { PrijavaVrsta } from '@/lib/database.types'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendPrijavaNotification, sendPrijavaConfirmation } from '@/lib/email'
import { hasValidImageSignature } from '@/lib/image-validation'

export type SubmitResult = { success: true } | { success: false; error: string }

const MAX_FIELD_LENGTH = 200
const MAX_MESSAGE_LENGTH = 3000
const MAX_PHOTOS = 5
const MAX_PHOTO_BYTES = 10 * 1024 * 1024
const PRIJAVE_BUCKET = 'prijave-photos'
const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

async function uploadPhotos(
  files: File[],
  supabase: NonNullable<ReturnType<typeof createServerClient>>,
): Promise<{ paths: string[]; signedUrls: string[] }> {
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucket = buckets?.find((b) => b.name === PRIJAVE_BUCKET)
  if (!bucket) {
    await supabase.storage.createBucket(PRIJAVE_BUCKET, { public: false })
  } else if (bucket.public) {
    await supabase.storage.updateBucket(PRIJAVE_BUCKET, { public: false })
  }

  const paths: string[] = []
  const signedUrls: string[] = []
  for (const file of files) {
    const ext = ALLOWED_PHOTO_TYPES[file.type]
    const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    if (!hasValidImageSignature(buffer, file.type)) {
      throw new Error('Invalid image signature')
    }
    const { data, error } = await supabase.storage
      .from(PRIJAVE_BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false })
    if (error) throw new Error(error.message)
    paths.push(data.path)

    const { data: signedData, error: signedError } = await supabase.storage
      .from(PRIJAVE_BUCKET)
      .createSignedUrl(data.path, 60 * 60 * 24 * 7)
    if (!signedError && signedData?.signedUrl) {
      signedUrls.push(signedData.signedUrl)
    }
  }
  return { paths, signedUrls }
}

export async function submitPrijava(formData: FormData): Promise<SubmitResult> {
  if (text(formData, 'website')) {
    return { success: true }
  }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? 'unknown'
  if (!checkRateLimit(`prijava:${ip}`, 5, 10 * 60 * 1000)) {
    return { success: false, error: 'Previše pokušaja. Pokušajte ponovo za nekoliko minuta.' }
  }

  const vrsta = text(formData, 'vrsta') as PrijavaVrsta
  const ime = text(formData, 'ime')
  const email = text(formData, 'email').toLowerCase()
  const telefon = text(formData, 'telefon')
  const grad = text(formData, 'grad')
  const poruka = text(formData, 'poruka')
  const suglasnost = formData.get('suglasnost')

  if ((vrsta !== 'trebam' && vrsta !== 'zelim') || !ime || !email || !telefon || !grad || !poruka) {
    return { success: false, error: 'Sva obavezna polja moraju biti popunjena.' }
  }

  if (suglasnost !== 'on') {
    return { success: false, error: 'Za slanje prijave potrebno je prihvatiti pravila korištenja i privatnosti.' }
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'Unesite ispravnu email adresu.' }
  }

  if (
    ime.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    telefon.length > MAX_FIELD_LENGTH ||
    grad.length > MAX_FIELD_LENGTH ||
    poruka.length > MAX_MESSAGE_LENGTH
  ) {
    return { success: false, error: 'Uneseni tekst je predug.' }
  }

  const rawFiles = formData.getAll('fotografije')
  const photoFiles = rawFiles.filter((f): f is File => f instanceof File && f.size > 0)

  if (vrsta === 'trebam' && photoFiles.length === 0) {
    return { success: false, error: 'Molimo priložite fotografije kupaonice.' }
  }

  if (photoFiles.length > MAX_PHOTOS) {
    return { success: false, error: `Možete priložiti najviše ${MAX_PHOTOS} fotografija.` }
  }

  for (const file of photoFiles) {
    if (!ALLOWED_PHOTO_TYPES[file.type]) {
      return { success: false, error: 'Fotografije moraju biti JPG, PNG, WebP ili AVIF format.' }
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return { success: false, error: 'Svaka fotografija mora biti manja od 10MB.' }
    }
  }

  const supabase = createServerClient()
  if (!supabase) return { success: false, error: 'Servis trenutno nije dostupan.' }

  let fotografije: string[] | null = null
  let signedPhotoUrls: string[] | undefined
  if (photoFiles.length > 0) {
    try {
      const uploaded = await uploadPhotos(photoFiles, supabase)
      fotografije = uploaded.paths
      signedPhotoUrls = uploaded.signedUrls
    } catch {
      return { success: false, error: 'Greška pri slanju fotografija. Pokušaj ponovo.' }
    }
  }

  const { error } = await supabase.from('prijave').insert({
    vrsta,
    ime,
    email,
    telefon,
    grad,
    poruka,
    status: 'nova',
    fotografije,
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return { success: false, error: 'Greška pri slanju. Pokušaj ponovo.' }
  }

  sendPrijavaNotification({
    vrsta,
    ime,
    email,
    telefon,
    grad,
    poruka,
    fotografije: signedPhotoUrls,
  }).catch((err) => console.error('Email notification failed:', err))

  sendPrijavaConfirmation({ vrsta, ime, email })
    .catch((err) => console.error('Email confirmation failed:', err))

  return { success: true }
}
