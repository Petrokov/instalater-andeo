import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'
import { checkRateLimit } from '@/lib/rate-limit'

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

function sanitizeFolder(folder: string) {
  if (folder.includes('..') || folder.includes('\\')) return null

  const safe = folder
    .split('/')
    .map((part) => part.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))
    .filter(Boolean)

  if (!safe.length || safe.length > 3) return null
  return safe.join('/')
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown'
  if (!checkRateLimit(`upload:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Previše zahtjeva. Pokušajte ponovo za sat vremena.' }, { status: 429 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const folderValue = (formData.get('folder') as string) || 'misc'
  const folder = sanitizeFolder(folderValue)

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!folder) {
    return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 })
  }

  const ext = ALLOWED_IMAGE_TYPES[file.type]
  if (!ext) {
    return NextResponse.json({ error: 'Only JPG, PNG, WebP and AVIF images are allowed' }, { status: 400 })
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'Image must be 10MB or smaller' }, { status: 400 })
  }

  const filename = `projects/${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const supabase = createServerClient()

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
