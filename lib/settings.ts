import { createServerClient } from '@/lib/supabase-server'

const SETTINGS_ROW_ID = 1

/**
 * Defaults to enabled when Supabase is unreachable or the row doesn't exist yet,
 * so a misconfigured/missing site_settings table never accidentally hides the form.
 */
export async function getContactFormEnabled(): Promise<boolean> {
  const supabase = createServerClient()
  if (!supabase) return true

  const { data, error } = await supabase
    .from('site_settings')
    .select('contact_form_enabled')
    .eq('id', SETTINGS_ROW_ID)
    .maybeSingle()

  if (error || !data) return true
  return data.contact_form_enabled
}
