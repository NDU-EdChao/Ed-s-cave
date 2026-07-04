import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, localeLabels } from "@/i18n/config";
import { getCategories, getCityBySlug } from "@/lib/data";
import { getUser } from "@/lib/auth";
import { createRequest } from "@/lib/actions";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function PostRequest({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; city: string }>;
  searchParams: Promise<{ category?: string; error?: string }>;
}) {
  const { locale, city } = await params;
  const { category, error } = await searchParams;
  if (!isLocale(locale)) notFound();

  const [c, categories, dict, user] = await Promise.all([
    getCityBySlug(city),
    getCategories(),
    getDictionary(locale),
    getUser(),
  ]);
  if (!c) notFound();
  if (!user) redirect(`/${locale}/login?next=/${locale}/${city}/post`);

  const inputCls =
    "mt-1 w-full rounded border border-black/15 px-3 py-2 dark:border-white/20 bg-transparent";

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        postHref={`/${locale}/${city}/post`}
        signedIn
      />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-5 px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">{dict.post.title}</h1>
        {error && <p className="text-sm text-red-600">*</p>}

        <form action={createRequest} className="flex flex-col gap-4">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="citySlug" value={city} />

          <label className="text-sm">
            <span className="font-medium">{dict.post.fCategory}</span>
            <select name="categorySlug" defaultValue={category ?? categories[0]?.slug} className={inputCls}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {dict.categories[cat.slug] ?? cat.slug}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="font-medium">{dict.post.fTitle}</span>
            <input name="title" required maxLength={120} className={inputCls} />
          </label>

          <label className="text-sm">
            <span className="font-medium">{dict.post.fDescription}</span>
            <textarea name="description" required rows={4} className={inputCls} />
          </label>

          <label className="text-sm">
            <span className="font-medium">{dict.post.fArea}</span>
            <input name="area" className={inputCls} />
          </label>

          <label className="text-sm">
            <span className="font-medium">{dict.post.fPreferredTime}</span>
            <input name="preferredTime" className={inputCls} />
          </label>

          <fieldset className="text-sm">
            <legend className="font-medium">{dict.post.contactMethod}</legend>
            <div className="mt-1 flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" name="contactMethod" value="phone" defaultChecked />
                {dict.post.phone}
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="contactMethod" value="email" />
                {dict.post.email}
              </label>
            </div>
            <input name="contactValue" required className={inputCls} placeholder={dict.post.contactValue} />
          </fieldset>

          <label className="text-sm">
            <span className="font-medium">{dict.post.writtenIn}</span>
            <select name="writtenIn" defaultValue={locale} className={inputCls}>
              {locales.map((l) => (
                <option key={l} value={l}>
                  {localeLabels[l]}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-zinc-400">{dict.post.languageNote}</p>
          </label>

          <button
            type="submit"
            className="w-fit rounded-full bg-foreground px-6 py-2 text-sm text-background"
          >
            {dict.post.submit}
          </button>
        </form>
      </main>
    </>
  );
}
