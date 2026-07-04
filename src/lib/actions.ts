"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  isLocale,
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import { hasSupabaseEnv } from "./supabase/env";
import { getServerSupabase } from "./supabase/server";
import { getServiceSupabase } from "./supabase/service";
import { getCategories, getCityBySlug } from "./data";
import { translateJobRequest } from "./translate-request";

function loc(formData: FormData): Locale {
  const v = String(formData.get("locale") ?? defaultLocale);
  return isLocale(v) ? v : defaultLocale;
}

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "request"
  );
}

export async function createRequest(formData: FormData) {
  const l = loc(formData);
  const citySlug = String(formData.get("citySlug") ?? "");
  const categorySlug = String(formData.get("categorySlug") ?? "");

  if (!hasSupabaseEnv()) redirect(`/${l}/${citySlug}`);
  const supa = await getServerSupabase();
  const {
    data: { user },
  } = await supa.auth.getUser();
  if (!user) redirect(`/${l}/login`);

  const city = await getCityBySlug(citySlug);
  const category = (await getCategories()).find((c) => c.slug === categorySlug);
  if (!city || !category) redirect(`/${l}/${citySlug}`);

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const area = String(formData.get("area") ?? "").trim() || null;
  const preferredTime = String(formData.get("preferredTime") ?? "").trim() || null;
  const contactMethod = String(formData.get("contactMethod") ?? "phone") === "email" ? "email" : "phone";
  const contactValue = String(formData.get("contactValue") ?? "").trim();
  const writtenIn = String(formData.get("writtenIn") ?? l);
  const source: Locale = isLocale(writtenIn) ? writtenIn : "en";

  if (!title || !description || !contactValue) {
    redirect(`/${l}/${citySlug}/post?category=${categorySlug}&error=1`);
  }

  const slug = `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`;
  const { data: inserted, error } = await supa
    .from("job_requests")
    .insert({
      owner_id: user.id,
      city_id: city.id,
      category_id: category.id,
      title,
      slug,
      description,
      area_label: area,
      preferred_time: preferredTime,
      source_lang: source,
      status: "open",
    })
    .select("id")
    .single();
  if (error || !inserted) {
    redirect(`/${l}/${citySlug}/post?category=${categorySlug}&error=1`);
  }

  const svc = getServiceSupabase();
  if (svc) {
    await svc.from("job_request_contacts").insert({
      job_request_id: inserted.id,
      contact_method: contactMethod,
      contact_value: contactValue,
    });
  }
  await translateJobRequest({
    requestId: inserted.id,
    source,
    targets: source === "en" ? [] : ["en"],
    title,
    description,
  });

  revalidatePath(`/${l}/${citySlug}`);
  revalidatePath(`/${l}/${citySlug}/${categorySlug}`);
  redirect(`/${l}/${citySlug}/request/${slug}`);
}

export async function closeRequest(formData: FormData) {
  const l = loc(formData);
  const id = String(formData.get("id") ?? "");
  if (hasSupabaseEnv() && id) {
    const supa = await getServerSupabase();
    await supa.from("job_requests").update({ status: "closed" }).eq("id", id);
  }
  revalidatePath(`/${l}/me`);
  redirect(`/${l}/me`);
}

export async function submitReport(formData: FormData) {
  const l = loc(formData);
  const citySlug = String(formData.get("citySlug") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const targetId = String(formData.get("targetId") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  const svc = getServiceSupabase();
  if (svc && targetId && reason) {
    await svc.from("reports").insert({
      target_type: "job_request",
      target_id: targetId,
      reason,
    });
  }
  redirect(`/${l}/${citySlug}/request/${slug}?reported=1`);
}

export async function signOut(formData: FormData) {
  const l = loc(formData);
  if (hasSupabaseEnv()) {
    const supa = await getServerSupabase();
    await supa.auth.signOut();
  }
  redirect(`/${l}`);
}
