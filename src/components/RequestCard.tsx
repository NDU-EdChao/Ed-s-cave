import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { RequestView } from "@/lib/types";

export default function RequestCard({
  view,
  dict,
  locale,
}: {
  view: RequestView;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/${view.citySlug}/request/${view.slug}`}
      className="block rounded-lg border border-black/10 p-4 transition-colors hover:bg-black/[.02] dark:border-white/15 dark:hover:bg-white/[.03]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-500">
          {dict.categories[view.categorySlug] ?? view.categorySlug}
        </span>
        {view.contentState === "machine" && (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {dict.board.autoTranslated}
          </span>
        )}
        {view.contentState === "untranslated" && (
          <span className="text-[10px] text-zinc-400">{dict.board.untranslated}</span>
        )}
      </div>
      <h3 className="mt-1 font-medium">{view.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {view.description}
      </p>
      {view.areaLabel && (
        <p className="mt-2 text-xs text-zinc-500">
          {dict.board.area}: {view.areaLabel}
        </p>
      )}
    </Link>
  );
}
