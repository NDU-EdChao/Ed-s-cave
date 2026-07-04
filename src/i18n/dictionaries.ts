// UI-string dictionaries, loaded per-locale on the server (Next 16 native i18n).
// Fixed UI strings + legal copy MUST be human-reviewed before launch — the
// zh-Hans / pa files are draft machine translations (see their _status key).
// Listing CONTENT translation is separate and lives in Supabase
// (job_request_translations), not here.
import type { Locale } from "./config";

export interface Dictionary {
  app: { name: string; tagline: string };
  nav: {
    post: string;
    browse: string;
    home: string;
    terms: string;
    privacy: string;
    disclaimer: string;
  };
  home: { heading: string; subheading: string; phase: string; cities: string };
  lang: { switch: string };
  categories: Record<string, string>;
  board: {
    latest: string;
    postCta: string;
    empty: string;
    autoTranslated: string;
    untranslated: string;
    revealContact: string;
    area: string;
    preferredTime: string;
    postedOn: string;
    report: string;
    reported: string;
    reportReason: string;
    disclaimer: string;
  };
  landing: { introLead: string };
  post: {
    title: string;
    fCategory: string;
    fTitle: string;
    fDescription: string;
    fArea: string;
    fPreferredTime: string;
    contactMethod: string;
    phone: string;
    email: string;
    contactValue: string;
    writtenIn: string;
    translateInto: string;
    baseNote: string;
    submit: string;
    loginRequired: string;
  };
  auth: {
    loginTitle: string;
    emailLabel: string;
    sendLink: string;
    linkSent: string;
    signOut: string;
    loginCta: string;
  };
  me: { title: string; empty: string; close: string; closed: string; open: string };
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
