import type { APIRoute } from 'astro';
import { insertRow } from '../../server/db';
import { isBot, isEmail, isPhone, json, parseAttribution, rateLimit, readBody, str } from '../../server/http';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!rateLimit(request, clientAddress, 8)) return json({ ok: false, error: 'Too many requests. Please try again in a minute.' }, 429);
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true }); // silently accept

  const data = {
    name: str(body.name, 120),
    business: str(body.business, 160),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    service: str(body.service, 120),
    budget: str(body.budget, 80),
    message: str(body.message, 3000),
    page: str(body.page, 400),
    lang: str(body.lang, 5) || 'en',
  };
  const attribution = parseAttribution(body.attribution);

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!data.email && !data.phone) errors.phone = 'Add a phone number or email so we can reply.';
  if (data.email && !isEmail(data.email)) errors.email = 'That email does not look right.';
  if (data.phone && !isPhone(data.phone)) errors.phone = 'That phone number does not look right.';
  if (data.message.length < 5) errors.message = 'Tell us a little about your goal.';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  // Supabase is the source of truth. A scheduled job there alerts the team on ntfy for
  // every new row (supabase/notifications.sql), so storing it is all this route does.
  const stored = await insertRow('contact_submissions', {
    name: data.name,
    business: data.business || null,
    email: data.email || null,
    phone: data.phone || null,
    service: data.service || null,
    budget: data.budget || null,
    message: data.message,
    lang: data.lang,
    page: data.page || null,
    attribution: attribution ?? null,
  });

  return json({ ok: stored.ok });
};
