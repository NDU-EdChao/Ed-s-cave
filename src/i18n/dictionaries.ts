// UI-string dictionaries, loaded per-locale on the server (Next 16 native i18n).
// Fixed UI strings + legal copy MUST be human-reviewed before launch — the
// zh-Hans / pa files are draft machine translations (see their _status key).
// Listing CONTENT translation is separate and lives in Supabase
// (job_request_translations), not here.
import type { Locale } from "./config";

export interface Dictionary {
  app: { name: string; tagline: string };
  nav: { post: string; browse: string };
  home: { heading: string; subheading: string; phase: string };
  lang: { switch: string };
}

const loaders: Record<Locale, () => Promise<{ default: unknown }>> = {
  en: () => import("./dictionaries/en.json"),
  "zh-Hans": () => import("./dictionaries/zh-Hans.json"),
  pa: () => import("./dictionaries/pa.json"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]();
  return mod.default as Dictionary;
}
