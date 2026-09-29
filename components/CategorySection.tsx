// Shared section wrapper for the career/interview/exam index pages, which
// all group their items into the same 8 CAREER_CATEGORY_ORDER buckets.
// `id` matches CATEGORY_SLUG from Header.tsx so the nav dropdown's category
// links jump straight to the right section instead of the top of the page.
export function CategorySection({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
      <div className="flex items-baseline gap-3 border-t border-hairline pt-5">
        <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
        {typeof count === "number" && (
          <span className="text-xs uppercase tracking-wide text-steel">
            {count} {count === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
