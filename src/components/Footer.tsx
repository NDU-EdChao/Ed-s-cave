import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/15">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm text-zinc-500">
        <p>{dict.app.name}</p>
        <nav className="flex flex-wrap gap-4" aria-label="Legal">
          <Link href={`/${locale}/terms`} className="hover:text-foreground">
            {dict.nav.terms}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-foreground">
            {dict.nav.privacy}
          </Link>
          <Link href={`/${locale}/disclaimer`} className="hover:text-foreground">
            {dict.nav.disclaimer}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
