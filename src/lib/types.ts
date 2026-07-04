import type { Locale } from "@/i18n/config";

export interface City {
  id: string;
  slug: string;
  name: string;
  province: string;
}

export interface Category {
  id: string;
  slug: string;
  is_emergency_eligible: boolean;
  sort_order: number;
}

// A request as shown on a card / detail page for a given locale. Contact is
// intentionally absent — it is served only via the gated reveal endpoint.
export interface RequestView {
  id: string;
  slug: string;
  title: string;
  description: string;
  areaLabel: string | null;
  preferredTime: string | null;
  photoUrls: string[];
  categorySlug: string;
  citySlug: string;
  createdAt: string;
  sourceLang: Locale;
  // How the shown title/description were produced for the requested locale.
  contentState: "original" | "machine" | "untranslated";
}
