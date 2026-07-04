import type { LegalPageContent } from "@/lib/legal-content";

export default function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          {content.reviewNotice}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{content.title}</h1>
        <p className="text-sm text-zinc-500">{content.updated}</p>
      </section>

      <div className="flex flex-col gap-7">
        {content.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
