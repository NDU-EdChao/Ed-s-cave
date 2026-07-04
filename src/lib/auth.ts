import { hasSupabaseEnv } from "./supabase/env";
import { getServerSupabase } from "./supabase/server";

export async function getUser() {
  if (!hasSupabaseEnv()) return null;
  const supa = await getServerSupabase();
  const { data } = await supa.auth.getUser();
  return data.user ?? null;
}
