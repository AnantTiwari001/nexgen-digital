# NexGen Digital — Website Plan

Marketing website for NexGen Digital, a digital growth agency based in Kathmandu, Nepal.
Version 1 is a promotional site: services, a flagship product (AI Smart Reviews QR Stand) with a
pre-order flow, testimonials, pricing placeholders, a contact form, and a lead-capture chatbot.

## Goals

- Visually impressive: bold orange brand, parallax, scroll animations, marquees, smooth scrolling.
- Static-first: every page is prerendered. Only three API endpoints run on the server
  (contact, pre-order, chat) so the site can be hosted almost anywhere with Node.
- Everything editable from data files: business info, services, pricing, testimonials, stats,
  translations, theme tokens. No code changes needed to update copy.
- English first, Nepali via toggle and `?lang=ne` URL param.
- Light and dark mode.
- SEO ready: meta, Open Graph, JSON-LD, sitemap, robots.
- Analytics hooks: GA4 and Meta Pixel IDs from config. UTM parameters captured on landing and
  attached to every form submission (groundwork for the future analytics surface).

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Astro 7 (`output: 'static'`) + `@astrojs/cloudflare` | Static pages served as assets, `/api/*` in a Cloudflare Worker; free plan allows commercial use. `@astrojs/node` is the one-line self-hosting fallback |
| Styling | Plain CSS with design tokens (`src/styles/tokens.css`) | No framework lock-in, easy theming |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll | Parallax, reveals, pinned sections |
| Signature moments | `src/scripts/trace.ts` + `src/styles/trace.css` (plain SVG/CSS, no library) | One glowing traced-line language reused on the hero, two service pages and the stats section, each tied to that page's subject; every trigger fires on load/scroll, never behind a drag or tap. Replaced an earlier tsParticles ember hero (reverted, see git history) that read as decorative noise rather than purposeful |
| Fonts | Astro Fonts API (Google provider, self-hosted at build): Poppins, Inter, Caveat | Brand type, no runtime Google requests |
| Storage | Supabase (hosted Postgres) via `@supabase/supabase-js`, console fallback | Generous free tier, built-in dashboard, no admin panel needed |
| Notifications | ntfy, sent by a pg_cron job inside Supabase every 10 minutes (`supabase/notifications.sql`) | Push alerts on the team's phones with no email setup; the site only writes rows. No customer emails: the thank-you screens say the team follows up by WhatsApp or phone |
| Chatbot | Rule-based FAQ engine + lead capture, all messages logged | No external AI dependency in v1 |
| i18n | Dictionary JSON + `data-i18n` attributes swapped on client | Single static build, URL param and toggle |

## Structure

```
src/
  config/site.ts          business info, contacts, hours, socials, analytics IDs, feature flags
  data/services.ts        service catalogue (categories, pages, features, process, pricing, FAQs)
  data/product.ts         AI Smart Reviews QR Stand (features, tiers, pre-order perks, FAQ)
  data/testimonials.ts    testimonials (placeholder, video slot)
  data/stats.ts           social-proof numbers
  data/team.ts            about page people
  data/faq.ts             chatbot knowledge base + general FAQ
  i18n/en.json, ne.json   translations; i18n/index.ts helpers
  styles/tokens.css       colours, type scale, spacing, radii, shadows, motion; light + dark
  styles/global.css       reset, base, utilities, shared components
  layouts/Base.astro      head, fonts, SEO, analytics, header, footer, chat widget, scripts
  components/             Logo, Header, Footer, Hero, sections, cards, forms, ChatWidget, toggles
  scripts/                client: animations, i18n, theme, utm, chat, forms
  server/                 storage (Supabase), validation, rate limit, chatbot engine
  pages/                  routes (see below)
scripts/generate-logo.mjs builds SVG logos from Poppins outlines into public/brand/
public/brand/             logo-horizontal.svg, logo-stacked.svg, logo-mark.svg, favicon
```

## Routes

| Route | Content |
| --- | --- |
| `/` | Midday to night, in ten sections (src/components/home/): hero with rating and a team/work/QR collage, client logos, the work (pinned horizontal reel), services as a priced list, results under the dusk sky, the QR stand, client stories, the team, how we work, closing call with prayer flags into a night-sky footer. Sections meet along ridgelines; each heading has a Nepali echo line. Photo slots show labelled placeholders until real assets are set in src/data |
| `/services` | Categorised catalogue |
| `/services/[slug]` | One page per service: hero, benefits, deliverables, recent-results gallery (placeholder case studies), process, why-choose-NexGen, matching testimonial, pricing tiers, FAQ, CTA |
| `/products/ai-smart-reviews-qr` | Product landing: how it works, features, use cases, tiers, pre-order CTA |
| `/preorder` | Multi-step pre-order: business, contact, product options, payment preference (no charge), review |
| `/preorder/thank-you` | Confirmation |
| `/pricing` | Placeholder pricing across services |
| `/about` | Story, values, team, Kathmandu roots |
| `/contact` | Form, WhatsApp, hours (6am to 10pm), map placeholder |
| `/privacy`, `/terms` | Placeholder legal pages |
| `/404` | Branded not-found |
| `POST /api/contact`, `POST /api/preorder`, `POST /api/chat` | Server endpoints |

## Services (organised)

1. Social Media — Social Media Management (SMM), Social Media Marketing & Advertising, Content Creation, Followers Growth
2. Paid Ads — Meta Ads, Google Ads
3. AI Creative — AI Smart Video Production, AI Graphics Design
4. Web — Website Design & Development
5. Local Business — AI Smart Reviews QR Stand (product)
6. Custom — Marketing & Advertising strategy, Custom Solutions

## Assumptions

- Nepali translation covers navigation, hero, CTAs, service names and section headings in v1; untranslated keys fall back to English.
- Pre-order stores no card data. Payment preference (eSewa, Khalti, bank transfer, cash) is collected as a choice only.
- Team alerts come from Supabase, not the site: pg_cron + pg_net post each new submission to an ntfy topic stored in Supabase Vault.
- Hosted on Cloudflare Workers (see README → Hosting).
