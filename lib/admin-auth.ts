import { cookies } from 'next/headers'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  verifyAdminSessionToken,
} from './admin-session'

export { ADMIN_SESSION_COOKIE, createAdminSessionToken } from './admin-session'

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: '/',
  }
}

export async function requireAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!verifyAdminSessionToken(session?.value)) {
    throw new Error('Unauthorized')
  }
}
