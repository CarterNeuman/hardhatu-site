// Pure, network-free logic for the live job-search feature on the
// Action Plan page. The actual HTTP calls to Adzuna live in
// app/api/jobs/route.ts; everything in this file is deliberately
// side-effect-free (no fetch, no fs, no env reads) so it can be
// exercised directly in a standalone test harness without a live
// Adzuna key -- same verification approach already used for
// lib/action-plan-generator.ts.

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  url: string;
  // ISO date string from Adzuna's own "created" field, or null if it
  // didn't supply one -- never guessed.
  postedAt: string | null;
  salaryMin?: number;
  salaryMax?: number;
  // True when Adzuna is estimating pay rather than it being employer-
  // stated -- surfaced so the UI can label it honestly instead of
  // presenting an estimate as a fact the employer posted.
  salaryIsPredicted?: boolean;
};

export type EntryPay = { low: number; high: number; unit: "annual" | "hourly" };
export type PayComparison = "below" | "typical" | "above";

const MAX_TRADE_LENGTH = 80;
const MAX_LOCATION_LENGTH = 100;
const MAX_TITLE_LENGTH = 200;
const MAX_COMPANY_LENGTH = 120;
const MAX_LOCATION_LABEL_LENGTH = 120;
const MAX_SNIPPET_LENGTH = 220;

// Strips control characters and collapses/trims whitespace, then caps
// length. Applied to every string that either becomes part of a request
// to Adzuna or gets rendered back to a visitor -- never throws: garbage
// in, a shorter clean (possibly empty) string out.
function cleanText(raw: unknown, maxLength: number): string {
  if (typeof raw !== "string") return "";
  const noControlChars = raw.replace(/[\u0000-\u001f\u007f]/g, " ");
  const collapsed = noControlChars.replace(/\s+/g, " ").trim();
  return collapsed.slice(0, maxLength);
}

// The career title or category name used as Adzuna's "what" keyword.
export function cleanTrade(raw: string): string {
  return cleanText(raw, MAX_TRADE_LENGTH);
}

// The visitor's typed location, used as Adzuna's "where" param.
// Lowercasing here (on top of the trim/collapse above) is what lets
// "Tampa, FL" and "tampa fl" share one cached search result instead of
// each spending a separate upstream call -- see buildAdzunaSearchUrl.
export function cleanLocation(raw: string): string {
  return cleanText(raw, MAX_LOCATION_LENGTH).toLowerCase();
}

export type AdzunaSearchParams = {
  appId: string;
  appKey: string;
  country: string; // e.g. "us"
  what: string;
  where: string;
  distanceMiles?: number;
  maxDaysOld?: number;
  categoryTag?: string;
  resultsPerPage?: number;
  page?: number;
};

// Builds the full Adzuna search URL exclusively through URLSearchParams,
// never string concatenation, so every value -- the visitor's own typed
// location included -- is correctly percent-encoded and can never be
// interpreted as an extra query parameter or break out of its own
// field, however it's typed (this is the fix for the "location string
// containing its own query syntax" risk flagged in the brainstorm).
export function buildAdzunaSearchUrl(params: AdzunaSearchParams): string {
  const page = params.page ?? 1;
  const url = new URL(`https://api.adzuna.com/v1/api/jobs/${params.country}/search/${page}`);
  const q = url.searchParams;
  q.set("app_id", params.appId);
  q.set("app_key", params.appKey);
  q.set("what", params.what);
  q.set("where", params.where);
  // Restrict keyword matching to the job title only, not the full body
  // text -- a stray mention of the trade buried in an unrelated
  // listing's description no longer counts as a match. See the
  // relevance brainstorm.
  q.set("title_only", "1");
  q.set("results_per_page", String(params.resultsPerPage ?? 10));
  q.set("content-type", "application/json");
  // Distance unit (miles vs km) isn't confirmed anywhere in Adzuna's
  // public docs as of this writing -- 25 is a reasonable starting
  // radius either way, worth checking against the live API/dashboard
  // once a real key exists rather than asserted as fact here.
  q.set("distance", String(params.distanceMiles ?? 25));
  if (params.maxDaysOld !== undefined) q.set("max_days_old", String(params.maxDaysOld));
  if (params.categoryTag) q.set("category", params.categoryTag);
  return url.toString();
}

export function buildAdzunaCategoriesUrl(appId: string, appKey: string, country: string): string {
  const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/categories`);
  url.searchParams.set("app_id", appId);
  url.searchParams.set("app_key", appKey);
  return url.toString();
}

// Picks the construction/trades-flavored category tag out of Adzuna's
// own category list, instead of hardcoding a guessed tag string -- the
// real taxonomy is only retrievable live, per-country, with a real key
// (see the project notes). Returns undefined, not a guess, when nothing
// matches, so the search still runs without a category filter rather
// than silently filtering on a wrong tag. Accepts fully untrusted input
// (the parsed body of a third-party API response) and never throws.
export function pickConstructionCategoryTag(raw: unknown): string | undefined {
  if (!Array.isArray(raw)) return undefined;
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const e = entry as Record<string, unknown>;
    if (typeof e.label === "string" && typeof e.tag === "string" && /construction/i.test(e.label)) {
      return e.tag;
    }
  }
  return undefined;
}

// Normalizes one raw Adzuna result object into a JobListing, or returns
// null to skip it entirely. Accepts fully untrusted input and never
// throws -- a malformed or partial entry from a third party is dropped,
// not a crashed route. Title and a working link are the two fields this
// feature can't do without; everything else missing just means a
// thinner card.
export function normalizeListing(raw: unknown): JobListing | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const title = cleanText(r.title, MAX_TITLE_LENGTH);
  const url = typeof r.redirect_url === "string" ? r.redirect_url : "";
  if (!title || !url) return null;

  const companyObj = r.company;
  const companyName =
    companyObj && typeof companyObj === "object"
      ? (companyObj as Record<string, unknown>).display_name
      : undefined;
  const company = cleanText(companyName, MAX_COMPANY_LENGTH) || "Employer not listed";

  const locationObj = r.location;
  const locationName =
    locationObj && typeof locationObj === "object"
      ? (locationObj as Record<string, unknown>).display_name
      : undefined;
  const location = cleanText(locationName, MAX_LOCATION_LABEL_LENGTH) || "Location not listed";

  const snippet = cleanText(r.description, MAX_SNIPPET_LENGTH);
  const postedAt = typeof r.created === "string" ? r.created : null;

  const salaryMin = typeof r.salary_min === "number" && Number.isFinite(r.salary_min) ? r.salary_min : undefined;
  const salaryMax = typeof r.salary_max === "number" && Number.isFinite(r.salary_max) ? r.salary_max : undefined;
  const salaryIsPredicted =
    r.salary_is_predicted === true || r.salary_is_predicted === "1" || r.salary_is_predicted === 1;

  const id = typeof r.id === "string" || typeof r.id === "number" ? String(r.id) : url;

  return { id, title, company, location, snippet, url, postedAt, salaryMin, salaryMax, salaryIsPredicted };
}

// Compares a listing's posted pay against the career's own entry-level
// payTimeline band (the same BLS-sourced figure the career page's "Pay
// expectations" chart already shows). Only compares when the career's
// band is already in annual terms -- Adzuna's salary fields aren't
// confirmed anywhere in its docs to always be annualized (vs.
// sometimes hourly), so a mismatched-unit comparison would be
// confidently wrong rather than just missing. No badge beats a wrong
// badge. The +/- bands avoid labeling every near-boundary value as a
// mismatch.
export function compareToEntryPay(listing: JobListing, entryPay?: EntryPay): PayComparison | null {
  if (!entryPay || entryPay.unit !== "annual") return null;
  const value = listing.salaryMax ?? listing.salaryMin;
  if (value === undefined || !Number.isFinite(value) || value <= 0) return null;

  if (value < entryPay.low * 0.9) return "below";
  if (value > entryPay.high * 1.15) return "above";
  return "typical";
}

// "Posted N days ago" -- pure and clock-injectable for testing. Returns
// null for unparseable dates or dates in the future (clock skew or bad
// upstream data), rather than claiming something false.
export function formatPostedRelative(postedAt: string | null, now: Date = new Date()): string | null {
  if (!postedAt) return null;
  const posted = new Date(postedAt);
  if (Number.isNaN(posted.getTime())) return null;
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (diffDays < 0) return null;
  if (diffDays === 0) return "Posted today";
  if (diffDays === 1) return "Posted yesterday";
  return `Posted ${diffDays} days ago`;
}

export type JobSearchResult =
  | { ok: true; query: { what: string; where: string; categoryTag?: string }; listings: JobListing[] }
  | {
      ok: false;
      reason:
        | "not_configured"
        | "invalid_input"
        | "rate_limited"
        | "upstream_error"
        | "network_error"
        // This server process has hit its configured ceiling on real
        // Adzuna calls (see ADZUNA_MAX_CALLS_PER_PROCESS in
        // app/api/jobs/route.ts) -- a hard backstop on top of caching
        // and the per-IP rate limiter, specifically so a scarce trial
        // quota can't get burned through by a runaway dev session.
        | "budget_exhausted";
    };

export type RateLimiter = { check: (key: string) => boolean };

// A simple fixed-window limiter, scoped to one warm server instance's
// memory -- not a distributed limit (that would need Vercel KV/Upstash,
// new infrastructure this feature doesn't need yet), just a real
// backstop against one visitor's stuck retry loop or a single bad actor
// burning through Adzuna's shared 250/day free-tier quota by
// themselves. `now` is injectable so tests can simulate the window
// rolling over without a real sleep.
export function createRateLimiter(maxRequests: number, windowMs: number, now: () => number = Date.now): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key: string): boolean {
      const t = now();
      const windowStart = t - windowMs;
      const recent = (hits.get(key) ?? []).filter((ts) => ts > windowStart);
      if (recent.length >= maxRequests) {
        hits.set(key, recent);
        return false;
      }
      recent.push(t);
      hits.set(key, recent);
      return true;
    },
  };
}

// Shared across requests within one warm server instance. 12
// requests/minute per IP is generous for a real visitor (one plan
// generation is one request) while still capping a stuck loop or a
// single abuser well below the 250/day upstream quota.
export const jobSearchRateLimiter = createRateLimiter(12, 60_000);
