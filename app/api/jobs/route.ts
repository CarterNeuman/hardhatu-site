import { NextResponse } from "next/server";
import {
  buildAdzunaCategoriesUrl,
  buildAdzunaSearchUrl,
  cleanLocation,
  cleanTrade,
  jobSearchRateLimiter,
  normalizeListing,
  pickConstructionCategoryTag,
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

export const dynamic = "force-dynamic";

const COUNTRY = "us";
// How long Adzuna's own responses are cached (via fetch's built-in
// revalidate option, not a hand-rolled cache store) -- the real lever
// for staying well under the 250/day free-tier cap as traffic grows.
// Many visitors searching similar trade+location combos within this
// window share one upstream call instead of each spending one.
const SEARCH_CACHE_SECONDS = 60 * 60 * 3;
// The category taxonomy basically never changes, so this is cached much
// longer -- one upstream call a day covers every visitor, not one per
// search.
const CATEGORY_CACHE_SECONDS = 60 * 60 * 24;
const FETCH_TIMEOUT_MS = 6_000;
const MAX_RESULTS = 8;

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

  // Resolve the construction-flavored category tag from Adzuna's own
  // taxonomy (never hardcoded -- see pickConstructionCategoryTag). A
  // failure here only means the search below runs without a category
  // filter, never a reason to fail the whole request.
  let categoryTag: string | undefined;
  try {
    const categoriesUrl = buildAdzunaCategoriesUrl(appId, appKey, COUNTRY);
    const categoriesRes = await fetchWithTimeout(categoriesUrl, CATEGORY_CACHE_SECONDS);
    if (categoriesRes.ok) {
      const categoriesBody: unknown = await categoriesRes.json();
      const results =
        categoriesBody && typeof categoriesBody === "object"
          ? (categoriesBody as Record<string, unknown>).results
          : undefined;
      categoryTag = pickConstructionCategoryTag(results);
    } else {
      console.warn(`[jobs] Adzuna categories call returned ${categoriesRes.status}`);
    }
  } catch (err) {
    console.warn("[jobs] network error fetching Adzuna categories", err);
  }

  const searchUrl = buildAdzunaSearchUrl({
    appId,
    appKey,
    country: COUNTRY,
    what,
    where,
    maxDaysOld: 30,
    categoryTag,
    resultsPerPage: MAX_RESULTS,
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

    return NextResponse.json<JobSearchResult>({ ok: true, query: { what, where, categoryTag }, listings });
  } catch (err) {
    console.error(`[jobs] network error contacting Adzuna for "${what}" near "${where}"`, err);
    return fail("network_error");
  }
}
