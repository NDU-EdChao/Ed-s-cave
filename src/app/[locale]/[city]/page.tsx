import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getCategories, getCityBySlug, getOpenRequests } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { altLanguages } from "@/lib/seo";
import Header from "@/components/Header";
import RequestCard from "@/components/RequestCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale)) return {};
  const c = await getCityBySlug(city);
  if (!c) return {};
  return {
    title: `${c.name}`,
    alternates: { languages: altLanguages((l) => `/${l}/${city}`) },
  };
}

export default async function CityHome({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  if (!isLocale(locale)) notFound();
  const c = await getCityBySlug(city);
  if (!c) notFound();
  const dict = await getDictionary(locale);
  const [categories, latest, user] = await Promise.all([
    getCategories(),
    getOpenRequests(city, null, locale, 20),
    getUser(),
  ]);

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        postHref={`/${locale}/${city}/post`}
        signedIn={!!user}
      />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {c.name}, {c.province}
        </h1>

        <section className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/${city}/${cat.slug}`}
              className="rounded-full border border-black/15 px-4 py-1.5 text-sm hover:bg-black/[.03] dark:border-white/20 dark:hover:bg-white/[.05]"
            >
              {dict.categories[cat.slug] ?? cat.slug}
            </Link>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {dict.board.latest}
          </h2>
          {latest.length === 0 ? (
            <p className="text-sm text-zinc-400">{dict.board.empty}</p>
          ) : (
            <div className="flex flex-col gap-3">
              {latest.map((v) => (
                <RequestCard key={v.id} view={v} dict={dict} locale={locale} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
