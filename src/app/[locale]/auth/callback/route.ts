import { NextRequest, NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { getServerSupabase } from "@/lib/supabase/server";

// Magic-link callback: exchange the code for a session (cookies are writable in
// a route handler), then continue to `next`.
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ locale: string }> },
) {
  const { locale } = await ctx.params;
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? `/${locale}`;

  if (code && hasSupabaseEnv()) {
    const supabase = await getServerSupabase();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
