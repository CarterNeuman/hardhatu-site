// Shared disclaimer used on any page carrying cost figures or
// state-specific specifics (e.g. insurance/claims licensing) that can go
// stale or vary by location.
export function Disclaimer({ lastReviewed }: { lastReviewed?: string }) {
  return (
    <p className="mt-6 border border-hairline bg-amber-soft/40 px-3 py-2 text-xs text-steel">
      {lastReviewed ? `Reviewed ${lastReviewed}. ` : ""}
      Costs, timelines, and licensing details vary by location and change over
      time. Treat these as a starting point, not a quote.
    </p>
  );
}
