/**
 * Persistent storage for every submission the site collects: contact enquiries,
 * pre-orders, and chat leads/messages. Backed by Supabase (hosted Postgres) —
 * chosen for its free tier (500MB database, unlimited API requests, 5GB bandwidth,
 * two projects) and its built-in table browser, so leads are visible in the
 * Supabase dashboard without a custom admin page.
 *
 * Run supabase/schema.sql once in the project's SQL editor to create the tables.
 *
 * Without SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY configured, rows are logged to
 * the console instead of written, so the site (and forms) keep working in
 * development with zero setup. Email notifications (src/server/mailer.ts) are a
 * separate, best-effort heads-up — this module is the source of truth.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from 'astro:env/server';

export type Table = 'contact_submissions' | 'preorders' | 'chat_leads' | 'chat_messages';

let client: SupabaseClient | null = null;
const configured = () => Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

function db(): SupabaseClient | null {
  if (!configured()) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export interface InsertResult {
  ok: boolean;
  id?: string | number;
  skipped?: boolean;
  error?: string;
}

/** Inserts one row and returns its id. Never throws — failures are logged and returned as { ok: false }. */
export async function insertRow(tableName: Table, row: Record<string, unknown>): Promise<InsertResult> {
  const c = db();
  if (!c) {
    console.info(`[db] Supabase not configured. Would insert into ${tableName}:`, JSON.stringify(row));
    if (import.meta.env.DEV) return { ok: true, skipped: true, id: `dev-${Date.now()}` };
    return { ok: true, skipped: true };
  }
  const { data, error } = await c.from(tableName).insert(row).select('id').single();
  if (error) {
    console.error(`[db] insert into ${tableName} failed:`, error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true, id: data?.id };
}
