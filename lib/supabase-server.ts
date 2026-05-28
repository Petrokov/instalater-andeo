import { createClient } from '@supabase/supabase-js'

export function hasServerSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

/**
 * Supabase keys are JWTs and always begin with "eyJ".
 * This catches obviously wrong values (empty strings, placeholder text, anon keys
 * accidentally used in place of the service role key, etc.) before a network
 * request is even attempted.
 */
export function isValidSupabaseKey(key: string | undefined): boolean {
  return typeof key === 'string' && key.startsWith('eyJ') && key.length > 100
}

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return null
  }

  if (!isValidSupabaseKey(key)) {
    console.error(
      '[Supabase] SUPABASE_SERVICE_ROLE_KEY does not look like a valid JWT. ' +
        'Make sure you are using the "service_role" key from your Supabase project settings, ' +
        'not the "anon" key or a placeholder value.'
    )
    return null
  }

  try {
    return createClient(url, key)
  } catch {
    return null
  }
}
