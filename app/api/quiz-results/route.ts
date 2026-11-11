import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { saveQuizResult } from "@/lib/db";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";

// The result must be one of the site's real career categories and the
// matched-career list is capped -- this feeds the admin dashboard's
// "what are people interested in" counts, so a signed-in account
// shouldn't be able to post arbitrary category names or oversized rows.
const KNOWN_CATEGORIES = new Set<string>(CAREER_CATEGORY_ORDER);
const MAX_MATCHED_CAREERS = 10;
const CAREER_ID_RE = /^[a-z0-9-]{1,100}$/;

// POST /api/quiz-results   {resultCategory, matchedCareerIds}
//
// Called once, client-side, whenever CareerMatchQuiz reaches a result
// screen. The quiz itself has no gate (it works for signed-out visitors
// too, see EmailGate's per-page rules), so this route doesn't error for a
// signed-out caller, it just reports nothing was saved -- there's no
// account to attach a result to, and that's fine, the quiz UX never
// depends on this call succeeding.
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: true, saved: false });
  }

  let body: { resultCategory?: unknown; matchedCareerIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const resultCategory = typeof body?.resultCategory === "string" ? body.resultCategory.trim() : "";
  const matchedCareerIds = Array.isArray(body?.matchedCareerIds)
    ? body.matchedCareerIds
        .filter((id): id is string => typeof id === "string" && CAREER_ID_RE.test(id))
        .slice(0, MAX_MATCHED_CAREERS)
    : [];

  if (!resultCategory) {
    return NextResponse.json({ ok: false, error: "resultCategory is required." }, { status: 400 });
  }
  if (!KNOWN_CATEGORIES.has(resultCategory)) {
    return NextResponse.json({ ok: false, error: "Unknown resultCategory." }, { status: 400 });
  }

  const rows = await saveQuizResult(userId, resultCategory, matchedCareerIds);
  return NextResponse.json({ ok: true, saved: true, result: rows[0] });
}
