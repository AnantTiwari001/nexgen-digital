# NexGen Digital — Website

Marketing website for NexGen Digital, a digital growth agency in Kathmandu, Nepal.
See [PLAN.md](./PLAN.md) for the full architecture and decisions.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/client (static assets) + dist/server (Cloudflare Worker)
npm run preview   # serve the production build locally, in Cloudflare's workerd runtime
npm run deploy    # build + deploy from your machine (needs `npx wrangler login` once)
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
two projects) via `src/server/db.ts`. The database is the source of truth: the site
only writes rows, and team alerts (see Notifications below) are sent by Supabase itself.

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
4. Locally, put them in `.dev.vars` (or `.env`); in production they're Worker secrets
   (see Hosting):
   ```
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
5. Browse and manage submissions any time in the Supabase dashboard's **Table Editor**
   — no admin panel needed. Each table has a `status` column (`contact_submissions`
   and `chat_leads` default to `new`; `preorders` adds `confirmed` / `produced` /
   `delivered` / `cancelled`) to track follow-up by hand until a proper admin view
   exists.

## Notifications (ntfy)

New contact enquiries, pre-orders and chat leads push to the team's phones through
[ntfy](https://ntfy.sh). The website doesn't send anything: a pg_cron job inside Supabase
runs every 10 minutes, posts one alert per new row, and stamps it `notified_at` so
nothing is sent twice. Customers get no email; the thank-you screens say the team will
follow up by WhatsApp or phone.

1. Install the ntfy app (Android / iOS) and subscribe to a topic with a long, random
   name, e.g. `nexgen-leads-8f3k2q9x`. On public ntfy.sh anyone who knows the name can
   read the topic, so treat it like a password.
2. In the Supabase **SQL Editor**, store the topic in Vault (keeps it out of git):
   ```sql
   select vault.create_secret('nexgen-leads-8f3k2q9x', 'ntfy_topic');
   ```
   Optional, the same way: `ntfy_server` for a self-hosted server (default
   `https://ntfy.sh`) and `ntfy_token` for a password-protected topic. To change one
   later: `select vault.update_secret((select id from vault.secrets where name = 'ntfy_topic'), 'new-value');`
3. Run [supabase/notifications.sql](./supabase/notifications.sql) once (safe to re-run).
   It enables `pg_cron` + `pg_net`, adds the `notified_at` columns (existing rows count
   as already sent) and schedules the job.
4. Test it without waiting for the schedule:
   ```sql
   select public.notify_new_submissions();  -- returns how many alerts it sent
   select * from net._http_response order by created desc limit 10;  -- delivery results
   ```

Every chat question is still logged to `chat_messages`, but only chat *leads* (visitors
who left contact details) trigger an alert.

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
`npm run preview` server (both on port 4321):

```bash
node scripts/screenshot.mjs /              # desktop + mobile, full page
node scripts/screenshot.mjs /about 1440 900 fold      # just the fold
node scripts/screenshot.mjs / 1440 900 fold dark ne   # dark mode, Nepali
```

## Hosting

Output is `output: 'static'` — every page is prerendered HTML served as static assets;
only `/api/contact`, `/api/preorder` and `/api/chat` run server-side, in a Cloudflare
Worker via the `@astrojs/cloudflare` adapter. Cloudflare's free plan allows commercial
sites, has unlimited static bandwidth, and has a data center in Kathmandu.
Images are optimized at build time (`imageService: 'compile'`), so no Cloudflare Images
binding is involved. Project settings live in [wrangler.jsonc](./wrangler.jsonc).

**Deploy from GitHub (recommended).** In the Cloudflare dashboard: **Workers & Pages →
Create → Import a repository**, pick this repo, and keep the project name
`nextgen-digital` (it must match `name` in `wrangler.jsonc`). Build command
`npm run build`, deploy command `npx wrangler deploy`. Every push to `main` then deploys;
other branches get preview URLs.

Configure two kinds of variables in the Worker's **Settings**:

| Where | Variables | Why |
| --- | --- | --- |
| **Build → Variables and secrets** | `PUBLIC_SITE_URL`, `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_META_PIXEL_ID` | Baked into the HTML at build time |
| **Variables and Secrets** (type: Secret) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Read by `/api/*` at runtime |

The site runs with none of them set: submissions log to the Worker's logs instead of
being stored, so set the Supabase secrets before launch.

**Custom domain.** Workers custom domains need the domain's DNS on Cloudflare (free).
Add the site in Cloudflare, then set the two nameservers it gives you at the registrar
(for `.com.np`, that's register.com.np). Once the zone is active, add
`nexgendigital.com.np` and `www.nexgendigital.com.np` under the Worker's **Settings →
Domains & Routes**; HTTPS certificates are issued automatically.

**Deploy from your machine** instead: `npx wrangler login` once, then `npm run deploy`.
Runtime secrets can be set from the CLI with `npx wrangler secret put SUPABASE_URL`.

Self-hosting instead of Cloudflare? Swap the adapter in `astro.config.mjs` — it's a
one-line change (`@astrojs/node` is still listed in `package.json`, so no reinstall is
needed):

```js
import node from '@astrojs/node';
// ...
adapter: node({ mode: 'standalone' }),
```

Then deploy `dist/` behind any Node host and run `node dist/server/entry.mjs`.
