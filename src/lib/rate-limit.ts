// Lightweight in-memory rate limiter for public endpoints.
//
// NOTE: On serverless (Vercel), memory is per-instance and ephemeral, so this is
// a soft limit — it stops naive floods and casual abuse from a single instance,
// not a distributed attacker. For hard guarantees, move to a shared store
// (e.g. Upstash Redis). It is intentionally dependency-free so it ships today.

interface Entry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Entry>();
let lastPrune = Date.now();

function prune(now: number) {
  // Prune expired entries occasionally to bound memory.
  if (now - lastPrune < 60_000 && buckets.size < 5000) return;
  lastPrune = now;
  buckets.forEach((e, k) => {
    if (now > e.resetAt) buckets.delete(k);
  });
}

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // seconds
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  prune(now);
  const e = buckets.get(key);
  if (!e || now > e.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (e.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((e.resetAt - now) / 1000) };
  }
  e.count += 1;
  return { ok: true, retryAfter: 0 };
}

// Best-effort client IP from proxy headers (Vercel sets x-forwarded-for).
export function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

// Standard 429 response body.
export function tooMany(retryAfter: number) {
  return { error: 'Too many requests. Please try again later.', retryAfter };
}
