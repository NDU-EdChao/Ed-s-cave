import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { submitReport } from "@/lib/actions";

export default function ReportForm({
  locale,
  citySlug,
  slug,
  targetId,
  dict,
  reported,
}: {
  locale: Locale;
  citySlug: string;
  slug: string;
  targetId: string;
  dict: Dictionary;
  reported: boolean;
}) {
  if (reported) {
    return <p className="text-sm text-green-600">{dict.board.reported}</p>;
  }
  return (
    <details className="text-sm">
      <summary className="cursor-pointer text-zinc-500">{dict.board.report}</summary>
      <form action={submitReport} className="mt-2 flex gap-2">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="citySlug" value={citySlug} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="targetId" value={targetId} />
        <input
          name="reason"
          required
          placeholder={dict.board.reportReason}
          className="flex-1 rounded border border-black/15 px-2 py-1 dark:border-white/20"
        />
        <button className="rounded border border-black/15 px-3 py-1 dark:border-white/20">
          {dict.board.report}
        </button>
      </form>
    </details>
  );
}
