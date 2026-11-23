type RateLimitBucket = { count: number; resetAt: number };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, RateLimitBucket>();

function pruneBuckets(now: number) {
  if (buckets.size < 5000) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  while (buckets.size >= 5000) {
    const oldestKey = buckets.keys().next().value;
    if (!oldestKey) break;
    buckets.delete(oldestKey);
  }
}

export function checkContactRateLimit(key: string, now = Date.now()) {
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    pruneBuckets(now);
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
