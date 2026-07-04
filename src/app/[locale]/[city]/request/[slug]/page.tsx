import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getCityBySlug, getRequestDetail } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { absolute, altLanguages } from "@/lib/seo";
import Header from "@/components/Header";
import RevealContact from "@/components/RevealContact";
import ReportForm from "@/components/ReportForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, city, slug } = await params;
  if (!isLocale(locale)) return {};
  const detail = await getRequestDetail(city, slug, locale);
  if (!detail) return {};
  const path = (l: string) => `/${l}/${city}/request/${slug}`;
  const available = detail.availableLocales;
  // Untranslated locale variants canonicalize to the source-language URL,
  // so we never index thin/doorway duplicates.
  const canonicalLocale = available.includes(locale) ? locale : detail.view.sourceLang;
  return {
    title: detail.view.title,
    alternates: {
      canonical: absolute(path(canonicalLocale)),
      languages: altLanguages(path, available),
    },
  };
}

export default async function RequestDetail({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>;
  searchParams: Promise<{ reported?: string }>;
}) {
  const { locale, city, slug } = await params;
  const { reported } = await searchParams;
  if (!isLocale(locale)) notFound();
  const [c, dict, detail, user] = await Promise.all([
    getCityBySlug(city),
    getDictionary(locale),
    getRequestDetail(city, slug, locale),
    getUser(),
  ]);
  if (!c || !detail) notFound();
  const v = detail.view;

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        postHref={`/${locale}/${city}/post`}
        signedIn={!!user}
      />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 px-6 py-10">
        <nav className="text-sm text-zinc-500">
          <Link href={`/${locale}/${city}`} className="hover:underline">
            {c.name}
          </Link>{" "}
          /{" "}
          <Link
            href={`/${locale}/${city}/${v.categorySlug}`}
            className="hover:underline"
          >
            {dict.categories[v.categorySlug] ?? v.categorySlug}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {v.contentState === "machine" && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {dict.board.autoTranslated}
            </span>
          )}
          {v.contentState === "untranslated" && (
            <span className="text-[10px] text-zinc-400">{dict.board.untranslated}</span>
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">{v.title}</h1>
        <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
          {v.description}
        </p>

        <dl className="flex flex-col gap-1 text-sm text-zinc-500">
          {v.areaLabel && (
            <div>
              <dt className="inline font-medium">{dict.board.area}: </dt>
              <dd className="inline">{v.areaLabel}</dd>
            </div>
          )}
          {v.preferredTime && (
            <div>
              <dt className="inline font-medium">{dict.board.preferredTime}: </dt>
              <dd className="inline">{v.preferredTime}</dd>
            </div>
          )}
          <div>
            <dt className="inline font-medium">{dict.board.postedOn}: </dt>
            <dd className="inline">{new Date(v.createdAt).toLocaleDateString(locale)}</dd>
          </div>
        </dl>

        <div className="rounded-lg border border-black/10 p-4 dark:border-white/15">
          <RevealContact requestId={v.id} label={dict.board.revealContact} />
        </div>

        <ReportForm
          locale={locale}
          citySlug={city}
          slug={slug}
          targetId={v.id}
          dict={dict}
          reported={reported === "1"}
        />

        <p className="text-xs text-zinc-400">{dict.board.disclaimer}</p>
      </main>
    </>
  );
}
