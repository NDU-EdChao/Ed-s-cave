import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getActiveCities } from "@/lib/data";
import { getUser } from "@/lib/auth";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const [cities, user] = await Promise.all([getActiveCities(), getUser()]);
  const postHref = cities[0]
    ? `/${locale}/${cities[0].slug}/post`
    : `/${locale}/login`;

  return (
    <>
      <Header locale={locale} dict={dict} postHref={postHref} signedIn={!!user} />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{dict.home.heading}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{dict.home.subheading}</p>
          <p className="text-sm text-zinc-400">{dict.home.phase}</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {dict.home.cities}
          </h2>
          {cities.length === 0 ? (
            <p className="text-sm text-zinc-400">—</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {cities.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/${locale}/${c.slug}`}
                    className="text-lg underline-offset-4 hover:underline"
                  >
                    {c.name}, {c.province}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
