// Supported locales. Adding a locale here + a dictionary file is all it takes.
// en = default / x-default. Punjabi (pa) uses Gurmukhi script (LTR).
export const locales = ["en", "zh-Hans", "pa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Names shown in the language switcher (in their own script).
export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  pa: "ਪੰਜਾਬੀ",
};

// BCP-47 tags for <html lang> and hreflang. Same values here for now.
export const hreflang: Record<Locale, string> = {
  en: "en",
  "zh-Hans": "zh-Hans",
  pa: "pa",
};
