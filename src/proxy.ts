// Next.js 16 renamed middleware -> "proxy". This redirects locale-less paths
// (e.g. "/") to a locale-prefixed path based on the Accept-Language header.
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

function getLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;
  const wanted = header
    .split(",")
    .map((part) => part.split(";")[0]!.trim().toLowerCase());
  for (const w of wanted) {
    if (w === "en" || w.startsWith("en-")) return "en";
    if (w.startsWith("zh")) return "zh-Hans"; // only Simplified is supported for now
    if (w === "pa" || w.startsWith("pa-") || w.startsWith("pa_")) return "pa";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
