import type { Locale } from "@/i18n/config";

// Provider adapter. Google is the default because DeepL does NOT support
// Punjabi (pa). zh-Hans may optionally be routed through DeepL for quality.
// Returns null when no provider/key is configured — callers then keep only the
// original text (no fake/empty translation).

const GOOGLE_LANG: Record<Locale, string> = {
  en: "en",
  "zh-Hans": "zh-CN",
  pa: "pa",
};
const DEEPL_LANG: Partial<Record<Locale, string>> = {
  en: "EN",
  "zh-Hans": "ZH", // DeepL has no Punjabi
};

async function google(text: string, source: Locale, target: Locale) {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!key) return null;
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: GOOGLE_LANG[source],
        target: GOOGLE_LANG[target],
        format: "text",
      }),
    },
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.translations?.[0]?.translatedText ?? null;
}

async function deepl(text: string, source: Locale, target: Locale) {
  const key = process.env.DEEPL_API_KEY;
  const t = DEEPL_LANG[target];
  const s = DEEPL_LANG[source];
  if (!key || !t) return null;
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      target_lang: t,
      ...(s ? { source_lang: s } : {}),
    }),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.translations?.[0]?.text ?? null;
}

export async function translateText(
  text: string,
  source: Locale,
  target: Locale,
): Promise<string | null> {
  if (source === target || !text.trim()) return null;
  const provider = process.env.TRANSLATION_PROVIDER ?? "google";
  // Prefer DeepL for zh-Hans when configured; everything else -> Google.
  if (target === "zh-Hans" && process.env.DEEPL_API_KEY) {
    const viaDeepl = await deepl(text, source, target);
    if (viaDeepl) return viaDeepl;
  }
  if (provider === "deepl") {
    return (await deepl(text, source, target)) ?? (await google(text, source, target));
  }
  return google(text, source, target);
}
