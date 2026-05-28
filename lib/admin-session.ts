import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

export const ADMIN_SESSION_COOKIE = 'admin_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7

function signingSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured.')
  return secret
}

function sign(payload: string) {
  return createHmac('sha256', signingSecret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer)
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000
  const nonce = randomBytes(32).toString('base64url')
  const payload = `${expiresAt}.${nonce}`
  return `${payload}.${sign(payload)}`
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false

  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [expiresAt, nonce, signature] = parts
  if (!expiresAt || !nonce || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false

  try {
    return safeEqual(signature, sign(`${expiresAt}.${nonce}`))
  } catch {
    return false
  }
}
