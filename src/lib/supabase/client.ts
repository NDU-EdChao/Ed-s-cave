"use client";
import { createBrowserClient } from "@supabase/ssr";

// Browser client for auth (magic-link sign-in) from Client Components.
export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
