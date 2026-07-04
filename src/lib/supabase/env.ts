export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Public reads/auth need the URL + anon key. When absent (e.g. this build
// environment), data helpers return empty so pages still render.
export const hasSupabaseEnv = () => Boolean(SUPABASE_URL && SUPABASE_ANON);
