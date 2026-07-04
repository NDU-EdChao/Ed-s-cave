import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { signOut } from "@/lib/actions";

export default function Header({
  locale,
  dict,
  postHref,
  signedIn,
}: {
  locale: Locale;
  dict: Dictionary;
  postHref: string;
  signedIn: boolean;
}) {
  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <Link href={`/${locale}`} className="font-semibold">
          {dict.app.name}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={postHref}
            className="rounded-full bg-foreground px-3 py-1 text-background"
          >
            {dict.nav.post}
          </Link>
          {signedIn ? (
            <>
              <Link href={`/${locale}/me`} className="text-zinc-500 hover:text-foreground">
                {dict.me.title}
              </Link>
              <form action={signOut}>
                <input type="hidden" name="locale" value={locale} />
                <button className="text-zinc-500 hover:text-foreground">
                  {dict.auth.signOut}
                </button>
              </form>
            </>
          ) : (
            <Link href={`/${locale}/login`} className="text-zinc-500 hover:text-foreground">
              {dict.auth.loginCta}
            </Link>
          )}
          <nav aria-label={dict.lang.switch} className="flex gap-2">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={l === locale ? "font-semibold underline" : "text-zinc-400"}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
