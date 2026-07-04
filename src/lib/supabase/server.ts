import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON } from "./env";

// Request-scoped client that respects RLS as the current user (anon or the
// logged-in poster, based on the session cookie). Call only when env exists.
export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component (cannot set cookies). The session is
          // refreshed by the proxy / route handlers instead — safe to ignore.
        }
      },
    },
  });
}
