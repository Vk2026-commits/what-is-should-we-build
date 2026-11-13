import { createClient } from "@supabase/supabase-js";

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey && !anonKey.startsWith("sb_secret_"));

export const supabase = createClient(
  url ?? "https://placeholder.supabase.co",
  supabaseConfigured ? anonKey! : "public-anon-key",
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);
