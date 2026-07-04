import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { hasSupabaseEnv } from "./supabase/env";
import { getServerSupabase } from "./supabase/server";
import type { Category, City, RequestView } from "./types";

// All helpers degrade to empty when Supabase env is absent, so pages render.

export async function getActiveCities(): Promise<City[]> {
  if (!hasSupabaseEnv()) return [];
  const supa = await getServerSupabase();
  const { data } = await supa
    .from("cities")
    .select("id,slug,name,province")
    .eq("is_active", true)
    .order("name");
  return (data as City[]) ?? [];
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const cities = await getActiveCities();
  return cities.find((c) => c.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) return [];
  const supa = await getServerSupabase();
  const { data } = await supa
    .from("service_categories")
    .select("id,slug,is_emergency_eligible,sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return (data as Category[]) ?? [];
}

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string;
  area_label: string | null;
  preferred_time: string | null;
  photo_urls: string[];
  source_lang: string;
  created_at: string;
  category_id: string;
};

function toView(
  row: Row,
  citySlug: string,
  catSlugById: Map<string, string>,
  translation: { title: string; description: string } | undefined,
  locale: Locale,
): RequestView {
  const source = isLocale(row.source_lang) ? row.source_lang : "en";
  let title = row.title;
  let description = row.description;
  let contentState: RequestView["contentState"] = "untranslated";
  if (locale === source) {
    contentState = "original";
  } else if (translation) {
    title = translation.title;
    description = translation.description;
    contentState = "machine";
  }
  return {
    id: row.id,
    slug: row.slug,
    title,
    description,
    areaLabel: row.area_label,
    preferredTime: row.preferred_time,
    photoUrls: row.photo_urls ?? [],
    categorySlug: catSlugById.get(row.category_id) ?? "",
    citySlug,
    createdAt: row.created_at,
    sourceLang: source,
    contentState,
  };
}

const ROW_COLS =
  "id,slug,title,description,area_label,preferred_time,photo_urls,source_lang,created_at,category_id";

export async function getOpenRequests(
  citySlug: string,
  categorySlug: string | null,
  locale: Locale,
  limit = 50,
): Promise<RequestView[]> {
  if (!hasSupabaseEnv()) return [];
  const city = await getCityBySlug(citySlug);
  if (!city) return [];
  const categories = await getCategories();
  const catSlugById = new Map(categories.map((c) => [c.id, c.slug]));
  const categoryId = categorySlug
    ? categories.find((c) => c.slug === categorySlug)?.id
    : undefined;
  if (categorySlug && !categoryId) return [];

  const supa = await getServerSupabase();
  let q = supa
    .from("job_requests")
    .select(ROW_COLS)
    .eq("status", "open")
    .eq("city_id", city.id)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (categoryId) q = q.eq("category_id", categoryId);
  const { data } = await q;
  const rows = (data as Row[]) ?? [];
  if (rows.length === 0) return [];

  const trById = await fetchTranslations(
    rows.map((r) => r.id),
    locale,
  );
  return rows.map((r) => toView(r, citySlug, catSlugById, trById.get(r.id), locale));
}

export async function getRequestDetail(
  citySlug: string,
  slug: string,
  locale: Locale,
): Promise<{ view: RequestView; availableLocales: Locale[] } | null> {
  if (!hasSupabaseEnv()) return null;
  const city = await getCityBySlug(citySlug);
  if (!city) return null;
  const categories = await getCategories();
  const catSlugById = new Map(categories.map((c) => [c.id, c.slug]));

  const supa = await getServerSupabase();
  const { data } = await supa
    .from("job_requests")
    .select(ROW_COLS)
    .eq("status", "open")
    .eq("city_id", city.id)
    .eq("slug", slug)
    .maybeSingle();
  const row = data as Row | null;
  if (!row) return null;

  const { data: trs } = await supa
    .from("job_request_translations")
    .select("lang_code,title_translated,description_translated")
    .eq("job_request_id", row.id)
    .eq("status", "published");
  const translations = (trs ?? []) as {
    lang_code: string;
    title_translated: string;
    description_translated: string;
  }[];

  const source = isLocale(row.source_lang) ? row.source_lang : "en";
  const availableLocales: Locale[] = [source];
  const match = translations.find((t) => t.lang_code === locale);
  for (const t of translations) if (isLocale(t.lang_code)) availableLocales.push(t.lang_code);

  const view = toView(
    row,
    citySlug,
    catSlugById,
    match
      ? { title: match.title_translated, description: match.description_translated }
      : undefined,
    locale,
  );
  return { view, availableLocales: [...new Set(availableLocales)] };
}

export interface MyRequest {
  id: string;
  slug: string;
  title: string;
  status: string;
  citySlug: string;
}

export async function getMyRequests(): Promise<MyRequest[]> {
  if (!hasSupabaseEnv()) return [];
  const supa = await getServerSupabase();
  const {
    data: { user },
  } = await supa.auth.getUser();
  if (!user) return [];
  const cities = await getActiveCities();
  const citySlugById = new Map(cities.map((c) => [c.id, c.slug]));
  const { data } = await supa
    .from("job_requests")
    .select("id,slug,title,status,city_id")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  return ((data ?? []) as (MyRequest & { city_id: string })[]).map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    status: r.status,
    citySlug: citySlugById.get(r.city_id) ?? "",
  }));
}

async function fetchTranslations(ids: string[], locale: Locale) {
  const map = new Map<string, { title: string; description: string }>();
  if (ids.length === 0) return map;
  const supa = await getServerSupabase();
  const { data } = await supa
    .from("job_request_translations")
    .select("job_request_id,title_translated,description_translated")
    .eq("lang_code", locale)
    .eq("status", "published")
    .in("job_request_id", ids);
  for (const t of (data ?? []) as {
    job_request_id: string;
    title_translated: string;
    description_translated: string;
  }[]) {
    map.set(t.job_request_id, {
      title: t.title_translated,
      description: t.description_translated,
    });
  }
  return map;
}
