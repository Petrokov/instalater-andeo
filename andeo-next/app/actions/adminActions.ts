'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import type { PrijavaStatus } from '@/lib/database.types'

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string

  if (password !== process.env.ADMIN_SECRET) {
    redirect('/admin/login?error=1')
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_session', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/admin')
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}

export async function updatePrijavaStatus(id: string, status: PrijavaStatus) {
  const supabase = createServerClient()
  const { error } = await supabase.from('prijave').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}
