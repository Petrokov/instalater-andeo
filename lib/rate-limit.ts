interface RateEntry {
  count: number
  resetAt: number
}

// In-memory, single-instance store: resets on restart and isn't shared across
// instances. Good enough for one process; a multi-instance/serverless deploy
// needs a shared store (e.g. Redis) to enforce limits across all of them.
const store = new Map<string, RateEntry>()

let lastSweep = Date.now()
const SWEEP_INTERVAL_MS = 10 * 60 * 1000

function sweepExpired(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/
const IPV6_RE = /^[0-9a-fA-F:]+$/

function isValidIp(value: string) {
  return value.length <= 45 && (IPV4_RE.test(value) || IPV6_RE.test(value))
}

/**
 * Best-effort client IP for rate-limit keys. Trusts X-Forwarded-For /
 * X-Real-Ip as set by the platform's edge proxy — if the app is exposed
 * directly (no trusted reverse proxy in front), these headers are
 * attacker-controlled and the limit can be bypassed by rotating them.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwarded && isValidIp(forwarded)) return forwarded

  const real = headers.get('x-real-ip')?.trim()
  if (real && isValidIp(real)) return real

  return 'unknown'
}

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  sweepExpired(now)

  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
