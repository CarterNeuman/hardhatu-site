// Shared disclaimer used on any page carrying cost figures or
// state-specific specifics (e.g. insurance/claims licensing) that can go
// stale or vary by location. `message` overrides the default wording for
// a page citing a different kind of time-sensitive figure (e.g. hiring
// demand or wage data on a Get Hired guide) without needing a second
// component.
export function Disclaimer({
  lastReviewed,
  message,
}: {
  lastReviewed?: string;
  message?: string;
}) {
  return (
    <p className="mt-6 border border-hairline bg-amber-soft/40 px-3 py-2 text-xs text-steel">
      {lastReviewed ? `Reviewed ${lastReviewed}. ` : ""}
      {message ||
        "Costs, timelines, and licensing details vary by location and change over time. Treat these as a starting point, not a quote."}
    </p>
  );
}
