import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { saveQuizResult } from "@/lib/db";

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

  let body: { resultCategory?: string; matchedCareerIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const resultCategory = (body.resultCategory || "").trim();
  const matchedCareerIds = Array.isArray(body.matchedCareerIds)
    ? body.matchedCareerIds.filter((id): id is string => typeof id === "string")
    : [];

  if (!resultCategory) {
    return NextResponse.json({ ok: false, error: "resultCategory is required." }, { status: 400 });
  }

  const rows = await saveQuizResult(userId, resultCategory, matchedCareerIds);
  return NextResponse.json({ ok: true, saved: true, result: rows[0] });
}
