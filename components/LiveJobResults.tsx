"use client";

// Live job search results, shown on the Action Plan page's result
// screen above the existing static job-board search-link buttons (see
// ActionPlanBuilder.tsx -- plan.jobBoardLinks). Calls app/api/jobs on
// mount with the plan's own trade + location and renders real listings
// when they come back.
//
// Deliberately silent on any failure: a missing Adzuna key, an upstream
// error, a timeout, or the visitor's own network hiccup all just leave
// this component rendering nothing, so the static buttons underneath
// stay the fallback a visitor actually sees -- never a visible error,
// never a broken-looking section. See
// claude/action-plan-job-search-escalation-brainstorm.md in the project
// notes for the full reasoning behind this and the relevance/resilience
// choices below.
import { useEffect, useState } from "react";
import { AccordionSubLabel } from "@/components/ActionPlanAccordion";
import {
  compareToEntryPay,
  formatPostedRelative,
  type EntryPay,
  type JobListing,
  type JobSearchResult,
} from "@/lib/job-search";

type Status = "loading" | "success" | "empty" | "unavailable";

const PAY_BADGE: Record<"below" | "typical" | "above", { label: string; className: string }> = {
  below: { label: "Below typical pay", className: "border-clay text-clay" },
  typical: { label: "Typical pay for this role", className: "border-hairline text-steel" },
  above: { label: "Above typical pay", className: "border-amber text-amber" },
};

// Fires a GA4 event if GA is actually configured on this deployment
// (see NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.example) -- never throws
// if gtag isn't present, since GA is optional sitewide.
function trackJobClick(title: string) {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "live_job_click", { job_title: title });
  } catch {
    // Never let an analytics call affect the actual click-through.
  }
}

export function LiveJobResults({
  trade,
  location,
  entryPay,
}: {
  trade: string;
  location: string;
  entryPay?: EntryPay;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [listings, setListings] = useState<JobListing[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!trade.trim() || !location.trim()) {
      setStatus("unavailable");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setListings([]);
    setHiddenIds(new Set());

    const params = new URLSearchParams({ what: trade, where: location });
    fetch(`/api/jobs?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json() as Promise<JobSearchResult>)
      .then((data) => {
        // The cleanup below aborts this fetch when trade/location change
        // again (or the component unmounts) before it resolves. Without
        // this guard, a slow, now-stale response could still land after
        // a newer request already set state, flashing the wrong result.
        if (controller.signal.aborted) return;
        if (!data.ok) {
          setStatus("unavailable");
          return;
        }
        if (data.listings.length === 0) {
          setStatus("empty");
        } else {
          setListings(data.listings);
          setStatus("success");
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setStatus("unavailable");
      });

    return () => controller.abort();
  }, [trade, location]);

  if (status === "unavailable") return null;

  const visibleListings = listings.filter((listing) => !hiddenIds.has(listing.id));

  return (
    <div className="print:hidden">
      <AccordionSubLabel>Live openings near you</AccordionSubLabel>
      <p className="mt-1 text-sm text-steel">
        Showing live results for {trade} near {location}.
      </p>

      {status === "loading" && <p className="mt-3 text-sm text-steel">Searching live openings...</p>}

      {status === "empty" && (
        <p className="mt-3 text-sm text-steel">
          No live openings matched this search in our job feed right now. That is not a sign this career
          has no real openings, it just means this one feed came up empty today. Use the search links
          below to check further, or check back soon.
        </p>
      )}

      {status === "success" && (
        <ul className="mt-3 flex flex-col gap-3">
          {visibleListings.map((listing) => {
            const postedLabel = formatPostedRelative(listing.postedAt);
            const payComparison = compareToEntryPay(listing, entryPay);
            const payBadge = payComparison ? PAY_BADGE[payComparison] : null;
            return (
              <li key={listing.id} className="border border-hairline p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <a
                      href={listing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackJobClick(listing.title)}
                      className="font-semibold text-ink hover:underline"
                    >
                      {listing.title}
                    </a>
                    <p className="mt-0.5 text-sm text-steel">
                      {listing.company} &middot; {listing.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHiddenIds((prev) => new Set(prev).add(listing.id))}
                    aria-label={`Hide ${listing.title}, not relevant`}
                    className="shrink-0 text-xs text-steel hover:text-ink"
                  >
                    Not relevant
                  </button>
                </div>
                {listing.snippet && <p className="mt-2 text-sm leading-relaxed text-ink">{listing.snippet}</p>}
                {(postedLabel || payBadge) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {postedLabel && <span className="text-xs text-steel">{postedLabel}</span>}
                    {payBadge && (
                      <span
                        className={`inline-block border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${payBadge.className}`}
                      >
                        {payBadge.label}
                        {listing.salaryIsPredicted ? " (estimated)" : ""}
                      </span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
