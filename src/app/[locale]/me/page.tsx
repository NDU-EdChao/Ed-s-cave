import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getMyRequests } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { closeRequest } from "@/lib/actions";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function MyRequests({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [dict, user] = await Promise.all([getDictionary(locale), getUser()]);
  if (!user) redirect(`/${locale}/login?next=/${locale}/me`);
  const requests = await getMyRequests();

  return (
    <>
      <Header locale={locale} dict={dict} postHref={`/${locale}`} signedIn />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">{dict.me.title}</h1>
        {requests.length === 0 ? (
          <p className="text-sm text-zinc-400">{dict.me.empty}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {requests.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-black/10 p-3 dark:border-white/15"
              >
                <Link
                  href={`/${locale}/${r.citySlug}/request/${r.slug}`}
                  className="truncate hover:underline"
                >
                  {r.title}
                </Link>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-500">
                    {r.status === "open" ? dict.me.open : dict.me.closed}
                  </span>
                  {r.status === "open" && (
                    <form action={closeRequest}>
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="id" value={r.id} />
                      <button className="rounded border border-black/15 px-2 py-0.5 dark:border-white/20">
                        {dict.me.close}
                      </button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
