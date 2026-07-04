import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, localeLabels } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex items-center justify-between">
        <span className="text-lg font-semibold">{dict.app.name}</span>
        <nav aria-label={dict.lang.switch} className="flex gap-3 text-sm">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={
                l === locale
                  ? "font-semibold underline"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }
            >
              {localeLabels[l]}
            </Link>
          ))}
        </nav>
      </header>

      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{dict.home.heading}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{dict.home.subheading}</p>
        <p className="text-sm text-zinc-400">{dict.home.phase}</p>
      </section>
    </main>
  );
}
