import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getCategories, getCityBySlug, getOpenRequests } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { absolute, altLanguages } from "@/lib/seo";
import Header from "@/components/Header";
import RequestCard from "@/components/RequestCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; category: string }>;
}): Promise<Metadata> {
  const { locale, city, category } = await params;
  if (!isLocale(locale)) return {};
  const [c, cats, dict] = await Promise.all([
    getCityBySlug(city),
    getCategories(),
    getDictionary(locale),
  ]);
  const cat = cats.find((x) => x.slug === category);
  if (!c || !cat) return {};
  const name = dict.categories[category] ?? category;
  return {
    title: `${name} — ${c.name}`,
    alternates: { languages: altLanguages((l) => `/${l}/${city}/${category}`) },
  };
}

export default async function CategoryLanding({
  params,
}: {
  params: Promise<{ locale: string; city: string; category: string }>;
}) {
  const { locale, city, category } = await params;
  if (!isLocale(locale)) notFound();
  const [c, categories, dict, user] = await Promise.all([
    getCityBySlug(city),
    getCategories(),
    getDictionary(locale),
    getUser(),
  ]);
  const cat = categories.find((x) => x.slug === category);
  if (!c || !cat) notFound();

  const requests = await getOpenRequests(city, category, locale);
  const categoryName = dict.categories[category] ?? category;
  const intro = dict.landing.introLead
    .replace("{category}", categoryName)
    .replace("{city}", c.name);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} — ${c.name}`,
    numberOfItems: requests.length,
    itemListElement: requests.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(`/${locale}/${city}/request/${v.slug}`),
      name: v.title,
    })),
  };

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        postHref={`/${locale}/${city}/post?category=${category}`}
        signedIn={!!user}
      />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
        <nav className="text-sm text-zinc-500">
          <Link href={`/${locale}/${city}`} className="hover:underline">
            {c.name}
          </Link>{" "}
          / {categoryName}
        </nav>

        <section className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {categoryName} — {c.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{intro}</p>
          <Link
            href={`/${locale}/${city}/post?category=${category}`}
            className="w-fit rounded-full bg-foreground px-5 py-2 text-sm text-background"
          >
            {dict.board.postCta}
          </Link>
        </section>

        <section className="flex flex-col gap-3">
          {requests.length === 0 ? (
            <p className="text-sm text-zinc-400">{dict.board.empty}</p>
          ) : (
            requests.map((v) => (
              <RequestCard key={v.id} view={v} dict={dict} locale={locale} />
            ))
          )}
        </section>

        <p className="text-xs text-zinc-400">{dict.board.disclaimer}</p>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}
