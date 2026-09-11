/** Small helpers shared by API endpoints: parsing, validation, rate limiting, responses. */

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

/** Accepts JSON or form-encoded bodies and returns a plain object. */
export async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    try {
      return (await request.json()) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  const fd = await request.formData();
  const out: Record<string, unknown> = {};
  fd.forEach((v, k) => {
    if (typeof v === 'string') {
      if (k in out) out[k] = ([] as string[]).concat(out[k] as string[], v);
      else out[k] = v;
    }
  });
  return out;
}

export const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isPhone = (v: string) => /^[+\d][\d\s\-()]{6,19}$/.test(v);

export class ValidationError extends Error {
  constructor(public fields: Record<string, string>) {
    super('validation');
  }
}

/* In-memory rate limit per IP. Good enough for a single Node instance. */
const buckets = new Map<string, number[]>();
export function rateLimit(request: Request, clientAddress: string | undefined, limit = 10, windowMs = 60_000) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
  const now = Date.now();
  const hits = (buckets.get(ip) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > 5000) buckets.clear();
  return hits.length <= limit;
}

/** Honeypot: bots fill hidden fields. */
export const isBot = (body: Record<string, unknown>) => Boolean(str(body.website_url) || str(body.company_fax));

export function parseAttribution(v: unknown) {
  if (typeof v === 'string' && v.trim()) {
    try {
      return JSON.parse(v);
    } catch {
      return undefined;
    }
  }
  return v && typeof v === 'object' ? v : undefined;
}
