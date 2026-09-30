import type { APIRoute } from 'astro';
import { insertRow } from '../../server/db';
import { isBot, isEmail, isPhone, json, parseAttribution, rateLimit, readBody, str } from '../../server/http';
import { product } from '../../data/product';

export const prerender = false;

// Timestamp + random suffix: short, readable, and collision-safe enough for the
// `reference` unique constraint in supabase/schema.sql.
const ref = () => `NX-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!rateLimit(request, clientAddress, 5)) return json({ ok: false, error: 'Too many requests. Please try again in a minute.' }, 429);
  const body = await readBody(request);
  if (isBot(body)) return json({ ok: true, reference: ref() });

  const d = {
    businessName: str(body.businessName, 160),
    businessType: str(body.businessType, 80),
    address: str(body.address, 300),
    city: str(body.city, 80),
    googleMaps: str(body.googleMaps, 400),
    instagram: str(body.instagram, 200),
    facebook: str(body.facebook, 200),
    tiktok: str(body.tiktok, 200),
    website: str(body.website, 200),
    contactName: str(body.contactName, 120),
    role: str(body.role, 80),
    phone: str(body.phone, 40),
    email: str(body.email, 160),
    plan: str(body.plan, 60),
    quantity: parseInt(str(body.quantity, 4) || '1', 10) || 1,
    finish: str(body.finish, 60),
    notes: str(body.notes, 2000),
    paymentMethod: str(body.paymentMethod, 40),
    billingName: str(body.billingName, 160),
    pan: str(body.pan, 40),
    consent: body.consent === true || body.consent === 'on' || body.consent === 'true',
    page: str(body.page, 400),
    lang: str(body.lang, 5) || 'en',
  };
  const attribution = parseAttribution(body.attribution);

  const errors: Record<string, string> = {};
  if (d.businessName.length < 2) errors.businessName = 'Business name is required.';
  if (!d.businessType) errors.businessType = 'Choose a business type.';
  if (!d.city) errors.city = 'City is required.';
  if (d.contactName.length < 2) errors.contactName = 'Contact name is required.';
  if (!isPhone(d.phone)) errors.phone = 'Enter a valid phone number.';
  if (!isEmail(d.email)) errors.email = 'Enter a valid email address.';
  if (!product.tiers.some((t) => t.name === d.plan)) errors.plan = 'Choose a plan.';
  if (d.quantity < 1 || d.quantity > 500) errors.quantity = 'Quantity must be between 1 and 500.';
  if (!product.options.paymentMethods.some((m) => m.id === d.paymentMethod)) errors.paymentMethod = 'Choose a payment method.';
  if (!d.consent) errors.consent = 'Please accept the terms.';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  const reference = ref();

  // Supabase is the source of truth. A scheduled job there alerts the team on ntfy for
  // every new row (supabase/notifications.sql), so storing it is all this route does.
  const stored = await insertRow('preorders', {
    reference,
    business_name: d.businessName,
    business_type: d.businessType,
    address: d.address || null,
    city: d.city,
    google_maps: d.googleMaps || null,
    instagram: d.instagram || null,
    facebook: d.facebook || null,
    tiktok: d.tiktok || null,
    website: d.website || null,
    contact_name: d.contactName,
    role: d.role || null,
    phone: d.phone,
    email: d.email,
    plan: d.plan,
    quantity: d.quantity,
    finish: d.finish || null,
    notes: d.notes || null,
    payment_method: d.paymentMethod,
    billing_name: d.billingName || null,
    pan: d.pan || null,
    lang: d.lang,
    page: d.page || null,
    attribution: attribution ?? null,
  });

  return json({ ok: stored.ok, reference });
};
