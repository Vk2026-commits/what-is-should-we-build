import { createClient } from "@supabase/supabase-js";

const url =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ||
  "https://bkmbgyhrldolybyuebwj.supabase.co";
// Public client key: safe for the browser; table access is enforced by Supabase RLS.
const anonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ||
  "sb_publishable_9xQF7ZaLUzjHVThy88aO0g_caBha1yS";

export const supabaseConfigured = Boolean(url && anonKey && !anonKey.startsWith("sb_secret_"));

export const supabase = createClient(
  url ?? "https://placeholder.supabase.co",
  supabaseConfigured ? anonKey! : "public-anon-key",
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);
