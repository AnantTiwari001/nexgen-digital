# NexGen Digital — Website

Marketing website for NexGen Digital, a digital growth agency in Kathmandu, Nepal.
See [PLAN.md](./PLAN.md) for the full architecture and decisions.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/client (static) + dist/server (Node adapter)
npm run preview   # serve the production build locally
```

## Editing content (no code changes needed for most updates)

| What | File |
| --- | --- |
| Business name, contact info, hours, socials, feature flags | [src/config/site.ts](./src/config/site.ts) |
| Services, pricing, FAQs, process steps | [src/data/services.ts](./src/data/services.ts) |
| The AI Smart Reviews QR product | [src/data/product.ts](./src/data/product.ts) |
| Testimonials | [src/data/testimonials.ts](./src/data/testimonials.ts) |
| Stats / social proof | [src/data/stats.ts](./src/data/stats.ts) |
| About page story, team, values | [src/data/team.ts](./src/data/team.ts) |
| Chatbot knowledge base | [src/data/faq.ts](./src/data/faq.ts) |
| English text | [src/i18n/en.json](./src/i18n/en.json) |
| Nepali text | [src/i18n/ne.json](./src/i18n/ne.json) |
| Colours, type, spacing (design tokens) | [src/styles/tokens.css](./src/styles/tokens.css) |

Every `Rs.` price in the data files is a **placeholder starting price** — replace with
real numbers before launch. Anything marked `placeholder: true` (testimonials, stats,
team, about story, contact details) is sample content and should be swapped for the
real thing.

## Regenerating the logo

The logo is built as SVG from Poppins outlines (no raster/AI-generated image):

```bash
node scripts/generate-logo.mjs
```

Edit `scripts/generate-logo.mjs` to change the X-mark geometry, spacing or colours,
then re-run. Outputs go to `public/brand/*.svg`, `public/favicon.svg` and
`src/generated/logo-paths.json` (used by `src/components/Logo.astro`).

## Storage (Supabase)

Every contact enquiry, pre-order and chat lead is written to Supabase (hosted
Postgres, free tier: 500MB database, unlimited API requests, 5GB bandwidth/month,
two projects) via `src/server/db.ts`. Storage happens before email — the database is
the source of truth; email (below) is just a best-effort notification on top, so a
lead is never lost if sending fails.

Without credentials configured, submissions are logged to the server console instead
of written, so the site keeps working with zero setup in development.

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings > API**, copy the **Project URL** and the **service_role**
   secret key (not the `anon`/public key — the service role key is required so the
   server can write while keeping the tables closed to the browser).
3. Open the **SQL Editor**, paste the contents of [supabase/schema.sql](./supabase/schema.sql),
   and run it once. This creates four tables with Row Level Security enabled and no
   public policies, so nothing is readable or writable except via the service role key:
   - `contact_submissions` — the contact form
   - `preorders` — AI Smart Reviews QR Stand pre-orders
   - `chat_leads` — visitors who left contact details in the chat widget
   - `chat_messages` — every question asked to the chat assistant, matched or not
     (useful for spotting gaps in `src/data/faq.ts`, and doubles as the seed of the
     future analytics/attribution surface)
4. Fill in `.env`:
   ```
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
5. Browse and manage submissions any time in the Supabase dashboard's **Table Editor**
   — no admin panel needed. Each table has a `status` column (`contact_submissions`
   and `chat_leads` default to `new`; `preorders` adds `confirmed` / `produced` /
   `delivered` / `cancelled`) to track follow-up by hand until a proper admin view
   exists.

## Email (Gmail API)

Contact, pre-order and chat-lead notifications send through the Gmail API
(`src/server/mailer.ts`). Without credentials configured, messages are logged to the
server console — the site keeps working in development.

To enable real sending, set up a Google Cloud OAuth client with the Gmail API enabled
and the `gmail.send` scope, get a refresh token for the sending mailbox, then fill in
`.env` (copy from `.env.example`):

```
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
GMAIL_SENDER=hello@nexgendigital.com.np
NOTIFY_EMAIL=hello@nexgendigital.com.np
```

## Analytics

Set `PUBLIC_GA_MEASUREMENT_ID` and/or `PUBLIC_META_PIXEL_ID` in `.env` to enable
Google Analytics 4 and the Meta Pixel (`src/components/Analytics.astro`). Both are
disabled until an ID is provided. UTM parameters and referrer are captured on landing
(`src/scripts/utm.ts`) and attached to every form/chat submission, ahead of a future
analytics/attribution surface.

## Language

The site renders in English by default. A Nepali translation is available via the
header toggle or `?lang=ne`. Add or edit strings in `src/i18n/en.json` /
`src/i18n/ne.json` — any key missing from the Nepali file falls back to English.

## Visual QA

`scripts/screenshot.mjs` renders any route with the locally installed Chrome (no
extra browser download) for quick visual checks against a running `npm run dev` or
`node dist/server/entry.mjs` server:

```bash
node scripts/screenshot.mjs /              # desktop + mobile, full page
node scripts/screenshot.mjs /about 1440 900 fold      # just the fold
node scripts/screenshot.mjs / 1440 900 fold dark ne   # dark mode, Nepali
```

## Hosting

Output is `output: 'static'` with the `@astrojs/node` adapter in standalone mode —
every page is prerendered HTML; only `/api/contact`, `/api/preorder` and `/api/chat`
run server-side. Deploy `dist/` behind any Node host, or swap the adapter for a
platform-specific one (Vercel, Netlify, Cloudflare) later without touching page code.
