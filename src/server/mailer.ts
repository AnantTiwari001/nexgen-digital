/**
 * Email delivery through the Gmail API.
 *
 * Requires GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN and GMAIL_SENDER.
 * Without them, messages are printed to the server console so the site keeps
 * working in development. Swap this module to change providers.
 */
import { google } from 'googleapis';
import { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_SENDER, NOTIFY_EMAIL } from 'astro:env/server';
import { site } from '../config/site';

export interface Mail {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export const notifyAddress = () => NOTIFY_EMAIL || GMAIL_SENDER || site.contact.email;

const configured = () => Boolean(GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && GMAIL_SENDER);

function base64url(input: string) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function encodeHeader(value: string) {
  // RFC 2047 for non-ASCII subjects/names
  return /[^\x20-\x7e]/.test(value) ? `=?UTF-8?B?${Buffer.from(value).toString('base64')}?=` : value;
}

function buildRaw(mail: Mail) {
  const from = `${encodeHeader(site.name)} <${GMAIL_SENDER}>`;
  const to = Array.isArray(mail.to) ? mail.to.join(', ') : mail.to;
  const boundary = `b_${Date.now().toString(36)}`;
  const text = mail.text ?? mail.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    mail.replyTo ? `Reply-To: ${mail.replyTo}` : '',
    `Subject: ${encodeHeader(mail.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    mail.html,
    '',
    `--${boundary}--`,
  ].filter((l) => l !== '');
  return base64url(lines.join('\r\n'));
}

let gmailClient: ReturnType<typeof google.gmail> | null = null;
function gmail() {
  if (gmailClient) return gmailClient;
  const auth = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });
  gmailClient = google.gmail({ version: 'v1', auth });
  return gmailClient;
}

export async function sendMail(mail: Mail): Promise<{ ok: boolean; id?: string; skipped?: boolean; error?: string }> {
  if (!configured()) {
    console.info('[mailer] Gmail not configured. Would send:\n', JSON.stringify({ to: mail.to, subject: mail.subject, replyTo: mail.replyTo }, null, 2));
    if (import.meta.env.DEV) console.info(mail.text ?? mail.html);
    return { ok: true, skipped: true };
  }
  try {
    const res = await gmail().users.messages.send({ userId: 'me', requestBody: { raw: buildRaw(mail) } });
    return { ok: true, id: res.data.id ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[mailer] send failed:', message);
    return { ok: false, error: message };
  }
}

/* ---------- Templates ---------- */

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f7f9;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0b0b0b">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:#ff5a00;color:#fff;padding:20px 24px;border-radius:16px 16px 0 0">
      <div style="font-family:Poppins,Segoe UI,Arial,sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.02em">NexGen Digital</div>
      <div style="opacity:.9;font-size:13px">Creative Growth Solutions for Nepal</div>
    </div>
    <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px">
      <h1 style="font-family:Poppins,Segoe UI,Arial,sans-serif;font-size:20px;margin:0 0 16px">${esc(title)}</h1>
      ${body}
    </div>
    <p style="font-size:12px;color:#6b7280;text-align:center;margin-top:16px">${esc(site.name)} · ${esc(site.location.city)}, ${esc(site.location.country)} · ${esc(site.contact.email)}</p>
  </div></body></html>`;
}

export function table(rows: [string, unknown][]) {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee;color:#6b7280;width:38%;vertical-align:top">${esc(k)}</td><td style="padding:8px 10px;border-bottom:1px solid #eee;vertical-align:top;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join('')}</table>`;
}

export function attributionRows(attribution: unknown): [string, unknown][] {
  if (!attribution || typeof attribution !== 'object') return [];
  const a = attribution as { params?: Record<string, string>; landing?: string; referrer?: string; visits?: number };
  const rows: [string, unknown][] = [];
  Object.entries(a.params ?? {}).forEach(([k, v]) => rows.push([k, v]));
  if (a.landing) rows.push(['Landing page', a.landing]);
  if (a.referrer) rows.push(['Referrer', a.referrer]);
  if (a.visits) rows.push(['Visits', a.visits]);
  return rows;
}
