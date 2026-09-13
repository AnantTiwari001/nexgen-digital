import type { APIRoute } from 'astro';
import { attributionRows, layout, notifyAddress, sendMail, table } from '../../server/mailer';
import { insertRow } from '../../server/db';
import { isBot, isEmail, isPhone, json, parseAttribution, rateLimit, readBody, str } from '../../server/http';
import { site } from '../../config/site';

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

  // Store first — this is the source of truth. Email below is a best-effort heads-up
  // and must never cause a submitted lead to be lost if sending fails.
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

  const subject = `New enquiry: ${data.name}${data.business ? ` (${data.business})` : ''}${data.service ? ` · ${data.service}` : ''}`;
  const rows: [string, unknown][] = [
    ['Name', data.name],
    ['Business', data.business],
    ['Email', data.email],
    ['Phone / WhatsApp', data.phone],
    ['Service', data.service],
    ['Budget', data.budget],
    ['Message', data.message],
    ['Language', data.lang],
    ['Page', data.page],
    ...attributionRows(attribution),
  ];

  const internal = await sendMail({
    to: notifyAddress(),
    replyTo: data.email || undefined,
    subject,
    html: layout('New website enquiry', table(rows)),
  });

  if (data.email) {
    await sendMail({
      to: data.email,
      subject: `Thanks ${data.name}, we received your message`,
      html: layout(
        `Namaste ${data.name}!`,
        `<p>Thank you for reaching out to ${site.name}. We have your message and will reply within one business day (usually much faster).</p>
         <p>Need something quicker? Message us on WhatsApp: <a href="https://wa.me/${site.contact.whatsapp}">+${site.contact.whatsapp}</a></p>
         <p style="color:#6b7280;font-size:13px">Your message:<br>${data.message.replace(/</g, '&lt;')}</p>
         <p>Ideas today. A brighter Nepal tomorrow.<br><strong>NexGen Digital</strong></p>`,
      ),
    });
  }

  return json({ ok: stored.ok || internal.ok, stored: stored.ok, skipped: internal.skipped });
};
