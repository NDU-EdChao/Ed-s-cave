import "server-only";
import type { Locale } from "@/i18n/config";
import { getServiceSupabase } from "./supabase/service";
import { translateText } from "./translate";

// Machine-translate a request's title/description into the poster-selected
// target languages and upsert published rows (labelled source='machine').
// Runs server-side. In production this belongs in an async queue (Supabase
// pg_cron / Edge Function); Phase 1 invokes it inline after creation.
export async function translateJobRequest(params: {
  requestId: string;
  source: Locale;
  targets: Locale[];
  title: string;
  description: string;
}) {
  const svc = getServiceSupabase();
  if (!svc) return; // no service key -> original-only, no fake translations

  for (const target of params.targets) {
    if (target === params.source) continue;
    const [title, description] = await Promise.all([
      translateText(params.title, params.source, target),
      translateText(params.description, params.source, target),
    ]);
    if (!title || !description) continue; // provider unavailable -> skip

    await svc.from("job_request_translations").upsert(
      {
        job_request_id: params.requestId,
        lang_code: target,
        title_translated: title,
        description_translated: description,
        source: "machine",
        status: "published",
        translated_at: new Date().toISOString(),
      },
      { onConflict: "job_request_id,lang_code" },
    );
  }
}
