import { NextResponse } from "next/server";
import {
  buildAdzunaSearchUrl,
  cleanLocation,
  cleanTrade,
  jobSearchRateLimiter,
  normalizeListing,
  type JobSearchResult,
} from "@/lib/job-search";

// Live job search for the Action Plan page's "Live openings near you"
// section -- see claude/action-plan-job-search-escalation-brainstorm.md
// in the project notes for the full plan. Needs ADZUNA_APP_ID and
// ADZUNA_APP_KEY (see .env.example) to do anything; without them this
// degrades to { ok: false, reason: "not_configured" } so the result
// screen falls back to the existing static job-board buttons instead
// of breaking.
//
// Every failure mode below returns ok: false rather than a 5xx -- an
// Adzuna outage, a blown quota, or a network error should never surface
// as a broken-looking page to a visitor, only as the static buttons
// quietly staying the only option. See lib/job-search.ts for the pure
// logic (query building, normalization, rate limiting) this route just
// wires up to a live fetch call.
//
// Adzuna's real offering turned out to be a scarce one-time trial quota
// for this account (not an ongoing daily free tier as its public docs
// describe for non-commercial use), so this route has two extra layers
// specifically to protect that budget while testing, on top of the
// caching/rate-limiting already here for the ongoing-traffic case: see
// JOBS_MOCK_MODE and ADZUNA_MAX_CALLS_PER_PROCESS below.

export const dynamic = "force-dynamic";

const COUNTRY = "us";
// How long Adzuna's own responses are cached (via fetch's built-in
// revalidate option, not a hand-rolled cache store). Many visitors (or
// repeated test loads) searching the same trade+location combo within
// this window share one upstream call instead of each spending one.
const SEARCH_CACHE_SECONDS = 60 * 60 * 3;
const FETCH_TIMEOUT_MS = 6_000;
// What the result screen actually shows -- unchanged.
const MAX_RESULTS = 8;
// What gets requested from Adzuna, on purpose larger than MAX_RESULTS.
// normalizeListing (lib/job-search.ts) drops any raw entry missing a
// title or a working link, so asking Adzuna for exactly 8 and hoping
// all 8 survive normalization risks showing fewer than 8 even when 8+
// real openings exist for a search. Asking for a bigger page and then
// slicing down to MAX_RESULTS after normalization/filtering (below)
// means a handful of incomplete entries can get dropped without
// shrinking what the visitor actually sees. Still exactly one upstream
// call either way -- results_per_page doesn't change that.
const FETCH_RESULTS = 15;

type FailureReason = Extract<JobSearchResult, { ok: false }>["reason"];

function fail(reason: FailureReason) {
  return NextResponse.json<JobSearchResult>({ ok: false, reason });
}

async function fetchWithTimeout(url: string, revalidateSeconds: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal, next: { revalidate: revalidateSeconds } });
  } finally {
    clearTimeout(timer);
  }
}

// A hard backstop on top of response caching and the per-IP rate
// limiter above: counts every real network call this warm server
// process makes to Adzuna and refuses once the configured ceiling is
// hit, logging clearly rather than silently doing nothing.
// Caching and rate limiting should keep real usage far below this
// during normal testing, but this exists so a scarce trial quota (not
// an ongoing daily free tier) can never get burned through by, say,
// Next's dev-mode fast-refresh re-running this route more than
// expected, or testing more distinct trade+location combos in one
// sitting than intended. Resets only when the server process restarts
// -- that's a known, deliberate limitation of an in-memory counter, not
// a substitute for watching Adzuna's own dashboard while testing.
const MAX_REAL_CALLS_PER_PROCESS = Number(process.env.ADZUNA_MAX_CALLS_PER_PROCESS) || 5;
let realCallCount = 0;

function tryConsumeRealCall(label: string): boolean {
  if (realCallCount >= MAX_REAL_CALLS_PER_PROCESS) {
    console.warn(
      `[jobs] real Adzuna call budget (${MAX_REAL_CALLS_PER_PROCESS}) exhausted for this server process, skipping the ${label} call. Restart the server or raise ADZUNA_MAX_CALLS_PER_PROCESS to allow more.`
    );
    return false;
  }
  realCallCount += 1;
  console.warn(`[jobs] making real Adzuna call ${realCallCount}/${MAX_REAL_CALLS_PER_PROCESS} this process (${label})`);
  return true;
}

// Canned, clearly-fake listings for local visual/UX testing with zero
// real Adzuna calls -- see JOBS_MOCK_MODE in .env.example. Deliberately
// run through the same normalizeListing() every real response goes
// through, so this exercises the actual rendering pipeline, not a
// hand-built shortcut, and deliberately varied (today/this
// week/two-weeks-old, below/typical/above/predicted/no pay data) so
// every visual state in LiveJobResults.tsx -- every badge, every
// posted-date label -- can be checked without spending a single real
// token.
function buildMockResult(what: string, where: string): JobSearchResult {
  const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
  const rawListings = [
    {
      id: "mock-1",
      title: `${what} - General Contractor`,
      company: { display_name: "Sample Construction Co. (mock data)" },
      location: { display_name: where },
      salary_min: 58000,
      salary_max: 72000,
      salary_is_predicted: false,
      created: daysAgo(1),
      redirect_url: "https://example.com/mock-listing-1",
      description: "Example listing for local visual testing only -- not a real job posting.",
    },
    {
      id: "mock-2",
      title: `${what} (Entry Level)`,
      company: { display_name: "Example Builders LLC (mock data)" },
      location: { display_name: where },
      salary_min: 38000,
      salary_max: 44000,
      salary_is_predicted: false,
      created: daysAgo(6),
      redirect_url: "https://example.com/mock-listing-2",
      description: "Example listing for local visual testing only -- not a real job posting.",
    },
    {
      id: "mock-3",
      title: `Senior ${what}`,
      company: { display_name: "Placeholder Development Group (mock data)" },
      location: { display_name: where },
      salary_min: 95000,
      salary_max: 115000,
      salary_is_predicted: true,
      created: daysAgo(0),
      redirect_url: "https://example.com/mock-listing-3",
      description: "Example listing for local visual testing only -- not a real job posting.",
    },
    {
      id: "mock-4",
      title: `${what} Trainee`,
      company: { display_name: "Test Data Partners (mock data)" },
      location: { display_name: where },
      created: daysAgo(14),
      redirect_url: "https://example.com/mock-listing-4",
      description: "Example listing with no salary data, to check that case renders cleanly too.",
    },
  ];
  const listings = rawListings
    .map(normalizeListing)
    .filter((listing): listing is NonNullable<typeof listing> => listing !== null);
  return { ok: true, query: { what, where }, listings };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const what = cleanTrade(searchParams.get("what") ?? "");
  const where = cleanLocation(searchParams.get("where") ?? "");
  if (!what || !where) {
    return fail("invalid_input");
  }

  // Best-effort client identifier for rate limiting -- Vercel sets
  // x-forwarded-for on every request; falls back to a shared bucket if
  // it's ever missing (e.g. local dev without a proxy in front), which
  // just means local testing shares one limit, never a crash.
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const clientKey = forwardedFor.split(",")[0]?.trim() || "unknown";
  if (!jobSearchRateLimiter.check(clientKey)) {
    console.warn(`[jobs] rate limit hit for client ${clientKey}`);
    return fail("rate_limited");
  }

  // Local-only escape hatch: set JOBS_MOCK_MODE=1 in .env.local (never
  // in Vercel) to see every visual state of the live-jobs section
  // without touching Adzuna at all, real key or not. See .env.example.
  if (process.env.JOBS_MOCK_MODE === "1") {
    return NextResponse.json<JobSearchResult>(buildMockResult(what, where));
  }

  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    // No Adzuna account connected yet. Log it server-side (visible in
    // your deployment's function logs) rather than silently doing
    // nothing -- same pattern as app/api/subscribe/route.ts's no-key
    // branch. Once both variables are set, this branch stops running.
    console.warn("[jobs] ADZUNA_APP_ID/ADZUNA_APP_KEY not set, live job search is disabled");
    return fail("not_configured");
  }

  // Deliberately no category filter: Adzuna auto-classifies each
  // listing into its own taxonomy, and that classification is often
  // wrong for construction-adjacent roles (a general contractor's "VDC
  // Manager" posting showed up filed under "Energy, Oil & Gas Jobs",
  // not "Trade & Construction Jobs" -- confirmed live while debugging
  // a "no results" report for Preconstruction Manager/Atlanta that
  // turned out to be exactly this). Filtering on that tag can silently
  // zero out a real, relevant result instead of excluding noise.
  // title_only below already keeps results on-topic for the searched
  // career title, so this isn't trading relevance for anything.
  //
  // The search call itself is the one that actually produces results,
  // so exhausting the budget here does fail the whole request rather
  // than degrading further -- there's nothing left to show without it.
  if (!tryConsumeRealCall("search")) {
    return fail("budget_exhausted");
  }

  const searchUrl = buildAdzunaSearchUrl({
    appId,
    appKey,
    country: COUNTRY,
    what,
    where,
    maxDaysOld: 30,
    resultsPerPage: FETCH_RESULTS,
  });

  try {
    const res = await fetchWithTimeout(searchUrl, SEARCH_CACHE_SECONDS);
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn(
        `[jobs] Adzuna search returned ${res.status} for "${what}" near "${where}": ${detail.slice(0, 300)}`
      );
      return fail("upstream_error");
    }

    const body: unknown = await res.json();
    const rawResults =
      body && typeof body === "object" && Array.isArray((body as Record<string, unknown>).results)
        ? ((body as Record<string, unknown>).results as unknown[])
        : [];

    const listings = rawResults
      .map(normalizeListing)
      .filter((listing): listing is NonNullable<typeof listing> => listing !== null)
      .slice(0, MAX_RESULTS);

    return NextResponse.json<JobSearchResult>({ ok: true, query: { what, where }, listings });
  } catch (err) {
    console.error(`[jobs] network error contacting Adzuna for "${what}" near "${where}"`, err);
    return fail("network_error");
  }
}
