import type { APIRoute } from 'astro';
import { attributionRows, layout, notifyAddress, sendMail, table } from '../../server/mailer';
import { insertRow } from '../../server/db';
import { isBot, isEmail, isPhone, json, parseAttribution, rateLimit, readBody, str } from '../../server/http';
import { product } from '../../data/product';
import { site } from '../../config/site';

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
  const tier = product.tiers.find((t) => t.name === d.plan)!;
  const payment = product.options.paymentMethods.find((m) => m.id === d.paymentMethod)!;

  // Store first — this is the source of truth. Email below is a best-effort heads-up.
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

  const rows: [string, unknown][] = [
    ['Reference', reference],
    ['Plan', `${tier.name} (Rs. ${tier.price}${tier.period ? ` ${tier.period}` : ''})`],
    ['Quantity', d.quantity],
    ['Finish', d.finish],
    ['Business', d.businessName],
    ['Type', d.businessType],
    ['Address', `${d.address}${d.city ? `, ${d.city}` : ''}`],
    ['Google Maps', d.googleMaps],
    ['Instagram', d.instagram],
    ['Facebook', d.facebook],
    ['TikTok', d.tiktok],
    ['Website', d.website],
    ['Contact', `${d.contactName}${d.role ? ` (${d.role})` : ''}`],
    ['Phone', d.phone],
    ['Email', d.email],
    ['Payment method', payment.label],
    ['Billing name', d.billingName],
    ['PAN / VAT', d.pan],
    ['Notes', d.notes],
    ['Language', d.lang],
    ['Page', d.page],
    ...attributionRows(attribution),
  ];

  const internal = await sendMail({
    to: notifyAddress(),
    replyTo: d.email,
    subject: `Pre-order ${reference}: ${d.businessName} · ${tier.name} × ${d.quantity}`,
    html: layout('New pre-order', table(rows)),
  });

  await sendMail({
    to: d.email,
    subject: `Your ${product.name} pre-order is reserved (${reference})`,
    html: layout(
      `Namaste ${d.contactName}, you're on the list!`,
      `<p>Thank you for pre-ordering the <strong>${product.name}</strong> for <strong>${d.businessName}</strong>. Your reference is <strong>${reference}</strong>.</p>
       <p><strong>No payment has been taken.</strong> We will confirm your details and collect payment by ${payment.label} on delivery or before dispatch.</p>
       ${table([
         ['Plan', `${tier.name} (Rs. ${tier.price}${tier.period ? ` ${tier.period}` : ''})`],
         ['Quantity', d.quantity],
         ['Finish', d.finish],
         ['Delivery to', `${d.address}${d.city ? `, ${d.city}` : ''}`],
       ])}
       <h3 style="font-family:Poppins,Arial,sans-serif;font-size:16px;margin:20px 0 8px">What happens next</h3>
       <ol style="padding-left:20px;font-size:14px;line-height:1.7">
         <li>We confirm your links and design within 2 business days.</li>
         <li>Your stand is produced in the first batch.</li>
         <li>Delivery and setup at your counter.</li>
       </ol>
       <p>Questions? WhatsApp us at <a href="https://wa.me/${site.contact.whatsapp}">+${site.contact.whatsapp}</a>.</p>
       <p>Local business, stronger Nepal.<br><strong>NexGen Digital</strong></p>`,
    ),
  });

  return json({ ok: stored.ok || internal.ok, reference, stored: stored.ok, skipped: internal.skipped });
};
