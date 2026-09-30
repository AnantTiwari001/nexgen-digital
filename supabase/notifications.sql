-- NexGen Digital — ntfy alerts for new submissions
--
-- Run once in the Supabase SQL editor, after schema.sql (safe to re-run). Every 10 minutes
-- a pg_cron job finds contact enquiries, pre-orders and chat leads that haven't been
-- announced yet, posts one ntfy notification per row, and stamps notified_at so nothing is
-- sent twice. The website isn't involved: it only writes rows (src/server/db.ts).
--
-- The ntfy topic lives in Supabase Vault rather than in this file, so it stays out of git.
-- Set it once in the SQL editor, then subscribe to the same topic in the ntfy app:
--
--   select vault.create_secret('nexgen-leads-<long random string>', 'ntfy_topic');
--
-- Optional, the same way: 'ntfy_server' for a self-hosted server (defaults to
-- https://ntfy.sh), and 'ntfy_token' (an ntfy access token) for a protected topic. Anyone
-- who knows a public ntfy.sh topic name can subscribe to it, so keep the name long and random.
--
-- Send pending alerts now:  select public.notify_new_submissions();  -- returns how many
-- Check deliveries:         select * from net._http_response order by created desc limit 10;

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- notified_at marks rows that have been announced. Rows that exist before this runs are
-- stamped as already sent, so the first run doesn't replay the whole history.
do $$
declare
  t text;
begin
  foreach t in array array['contact_submissions', 'preorders', 'chat_leads'] loop
    if not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = t and column_name = 'notified_at'
    ) then
      execute format('alter table public.%I add column notified_at timestamptz', t);
      execute format('update public.%I set notified_at = created_at', t);
    end if;
  end loop;
end $$;

-- ntfy turns anything over 4,096 bytes into a file attachment, and Devanagari takes 3 bytes
-- a character, so free-text fields are trimmed to keep each alert readable in the app.
create or replace function public.notify_new_submissions()
returns integer
language plpgsql
set search_path = ''
as $$
declare
  topic   text := (select decrypted_secret from vault.decrypted_secrets where name = 'ntfy_topic');
  server  text := coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'ntfy_server'), 'https://ntfy.sh');
  token   text := (select decrypted_secret from vault.decrypted_secrets where name = 'ntfy_token');
  headers jsonb := jsonb_build_object('Content-Type', 'application/json');
  r       record;
  sent    integer := 0;
begin
  if topic is null then
    raise notice 'ntfy_topic is not set in Vault; skipping';
    return 0;
  end if;
  if token is not null then
    headers := headers || jsonb_build_object('Authorization', 'Bearer ' || token);
  end if;

  -- One row per pending submission: its title, the key fields, and any long free text.
  for r in
    select * from (
      select 'contact_submissions' as tbl, id, created_at, 4 as priority, 'speech_balloon' as tag,
             'New enquiry: ' || name || coalesce(' (' || business || ')', '') as title,
             concat_ws(E'\n', 'Phone: ' || phone, 'Email: ' || email, 'Service: ' || service, 'Budget: ' || budget) as details,
             left(message, 900) as long_text
      from public.contact_submissions where notified_at is null
      union all
      select 'preorders', id, created_at, 4, 'package',
             'Pre-order ' || reference || ': ' || business_name,
             concat_ws(E'\n', 'Plan: ' || plan || ' × ' || quantity, 'Contact: ' || contact_name || coalesce(' (' || role || ')', ''),
                       'Phone: ' || phone, 'Email: ' || email, 'City: ' || city, 'Payment: ' || payment_method),
             left(notes, 500)
      from public.preorders where notified_at is null
      union all
      select 'chat_leads', id, created_at, 3, 'robot',
             'Chat lead: ' || name,
             concat_ws(E'\n', 'Contact: ' || contact, 'Page: ' || page),
             right(transcript, 700)
      from public.chat_leads where notified_at is null
    ) pending
    order by created_at
    limit 50 -- a spam burst drips out over several runs instead of flooding the phone
  loop
    perform net.http_post(
      url     := server,
      headers := headers,
      body    := jsonb_build_object(
        'topic', topic,
        'title', r.title,
        'message', concat_ws(E'\n\n', nullif(r.details, ''), r.long_text,
                             'Received ' || to_char(r.created_at at time zone 'Asia/Kathmandu', 'DD Mon, HH24:MI')),
        'tags', jsonb_build_array(r.tag),
        'priority', r.priority
      )
    );
    execute format('update public.%I set notified_at = now() where id = $1', r.tbl) using r.id;
    sent := sent + 1;
  end loop;

  return sent;
end;
$$;

-- Supabase exposes public functions over its REST API; this one is for the cron job only.
revoke execute on function public.notify_new_submissions() from public, anon, authenticated;

-- Re-running replaces the job with the same name rather than adding a second one.
select cron.schedule('ntfy-new-submissions', '*/10 * * * *', 'select public.notify_new_submissions()');
