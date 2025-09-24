type Record = { count: number; resetAt: number };
const store = new Map<string, Record>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const rec = store.get(key);
  if (!rec || rec.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true } as const;
  }
  if (rec.count >= limit) return { ok: false, retryAfter: Math.ceil((rec.resetAt - now) / 1000) } as const;
  rec.count += 1;
  return { ok: true } as const;
}
