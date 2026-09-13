-- NexGen Digital — Supabase schema
--
-- Run this once in the Supabase project's SQL editor (Project > SQL Editor > New query).
-- Creates the four tables the site writes to (src/server/db.ts) and locks them down with
-- Row Level Security: the site writes using the service_role key (bypasses RLS by design),
-- so no anon/public policies are created — nothing is readable or writable from the browser.
-- View and manage rows from Table Editor in the Supabase dashboard, or with SQL.

create extension if not exists pgcrypto; -- for gen_random_uuid()

-- ---------------------------------------------------------------------------
-- Contact form submissions (/api/contact)
-- ---------------------------------------------------------------------------
create table if not exists contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  business     text,
  email        text,
  phone        text,
  service      text,
  budget       text,
  message      text not null,
  lang         text default 'en',
  page         text,
  attribution  jsonb,
  status       text not null default 'new' -- new | contacted | closed (edit manually in the dashboard)
);
alter table contact_submissions enable row level security;

-- ---------------------------------------------------------------------------
-- AI Smart Reviews QR Stand pre-orders (/api/preorder)
-- ---------------------------------------------------------------------------
create table if not exists preorders (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  reference       text not null unique,
  business_name   text not null,
  business_type   text,
  address         text,
  city            text,
  google_maps     text,
  instagram       text,
  facebook        text,
  tiktok          text,
  website         text,
  contact_name    text not null,
  role            text,
  phone           text not null,
  email           text not null,
  plan            text not null,
  quantity        integer not null default 1,
  finish          text,
  notes           text,
  payment_method  text not null,
  billing_name    text,
  pan             text,
  lang            text default 'en',
  page            text,
  attribution     jsonb,
  status          text not null default 'new' -- new | confirmed | produced | delivered | cancelled
);
alter table preorders enable row level security;

-- ---------------------------------------------------------------------------
-- Chat leads: a visitor left contact details for the team to follow up
-- ---------------------------------------------------------------------------
create table if not exists chat_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  contact      text not null,
  transcript   text,
  page         text,
  lang         text default 'en',
  attribution  jsonb,
  status       text not null default 'new'
);
alter table chat_leads enable row level security;

-- ---------------------------------------------------------------------------
-- Every chat question + answer, for improving the knowledge base and as the
-- seed of the future analytics/attribution surface.
-- ---------------------------------------------------------------------------
create table if not exists chat_messages (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  message      text not null,
  answer       text,
  matched      boolean default false,
  knowledge_id text, -- which FAQ entry answered it, if any (see src/data/faq.ts)
  lang         text default 'en',
  page         text,
  attribution  jsonb
);
alter table chat_messages enable row level security;

-- Helpful indexes for the dashboard and any future reporting queries
create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index if not exists preorders_created_at_idx on preorders (created_at desc);
create index if not exists chat_leads_created_at_idx on chat_leads (created_at desc);
create index if not exists chat_messages_created_at_idx on chat_messages (created_at desc);
create index if not exists chat_messages_matched_idx on chat_messages (matched);
