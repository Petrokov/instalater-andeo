import { createClient } from '@supabase/supabase-js'

export function hasServerSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export function createServerClient() {
  if (!hasServerSupabaseEnv()) {
    return null
  }

  try {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    )
  } catch {
    return null
  }
}
