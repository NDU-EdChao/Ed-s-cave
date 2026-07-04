import { hreflang, locales, type Locale } from "@/i18n/config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// hreflang alternates for a page that exists in `available` locales.
// `pathFor(locale)` must return the locale-prefixed path (no origin).
export function altLanguages(
  pathFor: (l: Locale) => string,
  available: Locale[] = [...locales],
): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of available) langs[hreflang[l]] = `${siteUrl}${pathFor(l)}`;
  // x-default -> English
  if (available.includes("en")) langs["x-default"] = `${siteUrl}${pathFor("en")}`;
  return langs;
}

export function absolute(path: string) {
  return `${siteUrl}${path}`;
}
