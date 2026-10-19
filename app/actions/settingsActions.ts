'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'
import { createServerClient } from '@/lib/supabase-server'

const SETTINGS_ROW_ID = 1

export async function setContactFormEnabled(enabled: boolean) {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: SETTINGS_ROW_ID, contact_form_enabled: enabled, updated_at: new Date().toISOString() })

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin/postavke')
}
