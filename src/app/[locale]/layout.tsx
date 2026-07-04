import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Footer from "@/components/Footer";

// Pre-render one static tree per locale.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Sault Trades", template: "%s · Sault Trades" },
  description: "Local service requests for Sault Ste. Marie.",
};

// This is the ROOT layout (nested under [locale] per Next 16 i18n convention).
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
