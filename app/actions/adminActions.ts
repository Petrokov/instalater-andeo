'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { createServerClient } from '@/lib/supabase-server'
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  requireAdmin,
} from '@/lib/admin-auth'
import { checkRateLimit } from '@/lib/rate-limit'
import type { PrijavaStatus } from '@/lib/database.types'

export async function adminLogin(formData: FormData) {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? 'unknown'
  if (!checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000)) {
    redirect('/admin/login?error=1')
  }

  const password = formData.get('password') as string
  const hash = process.env.ADMIN_PASSWORD_HASH

  if (!hash || !password || !(await bcrypt.compare(password, hash))) {
    redirect('/admin/login?error=1')
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), adminCookieOptions())

  redirect('/admin')
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  redirect('/admin/login')
}

export async function updatePrijavaStatus(id: string, status: PrijavaStatus) {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('prijave').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}
