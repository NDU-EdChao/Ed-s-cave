import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import LegalPage from "@/components/LegalPage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getUser } from "@/lib/auth";
import { getActiveCities } from "@/lib/data";
import { getLegalPage } from "@/lib/legal-content";
import { altLanguages } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getLegalPage(locale, "disclaimer");
  return {
    title: content.title,
    alternates: { languages: altLanguages((l) => `/${l}/disclaimer`) },
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, cities, user] = await Promise.all([
    getDictionary(locale),
    getActiveCities(),
    getUser(),
  ]);
  const postHref = cities[0] ? `/${locale}/${cities[0].slug}/post` : `/${locale}`;

  return (
    <>
      <Header locale={locale} dict={dict} postHref={postHref} signedIn={!!user} />
      <LegalPage content={getLegalPage(locale, "disclaimer")} />
    </>
  );
}
