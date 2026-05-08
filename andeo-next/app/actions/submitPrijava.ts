'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { PrijavaVrsta } from '@/lib/database.types'

export type SubmitResult = { success: true } | { success: false; error: string }

export async function submitPrijava(formData: FormData): Promise<SubmitResult> {
  const vrsta = formData.get('vrsta') as PrijavaVrsta
  const ime = formData.get('ime') as string
  const email = formData.get('email') as string
  const telefon = formData.get('telefon') as string | null
  const grad = formData.get('grad') as string
  const poruka = formData.get('poruka') as string

  if (!vrsta || !ime || !email || !grad || !poruka) {
    return { success: false, error: 'Sva obavezna polja moraju biti popunjena.' }
  }

  const supabase = createServerClient()

  const { error } = await supabase.from('prijave').insert({
    vrsta,
    ime,
    email,
    telefon: telefon || null,
    grad,
    poruka,
    status: 'nova',
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return { success: false, error: 'Greška pri slanju. Pokušaj ponovo.' }
  }

  return { success: true }
}
