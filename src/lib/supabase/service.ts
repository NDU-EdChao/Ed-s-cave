import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./env";

// Privileged, server-only client that BYPASSES RLS. Use only in Server Actions /
// Route Handlers for: writing translations, reading gated contacts, logging
// reveals, inserting reports. NEVER import from a Client Component.
export function getServiceSupabase() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
