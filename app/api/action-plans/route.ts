import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getActionPlansForUser, upsertActionPlan, deleteActionPlan } from "@/lib/db";

// Backs the "saved Action Plans" feature: a signed-in user's Blueprint
// intake (not the generated plan itself -- see actionPlans in
// lib/db/schema.ts for why) persists here so they can come back to it
// without re-entering their answers.
//   GET    /api/action-plans            -> every saved plan for this user
//   POST   /api/action-plans {category, careerId, status, location,
//                              hoursPerWeek, timelineWeeks, certsHeld}
//                                        -> save/update one plan (upsert
//                                           on category+careerId)
//   DELETE /api/action-plans {category, careerId} -> remove one plan
//
// Every method requires a signed-in Clerk session, same as /api/progress
// -- there's nowhere to attach a saved plan without an account.

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  const rows = await getActionPlansForUser(userId);
  return NextResponse.json({ ok: true, plans: rows });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: {
    category?: string;
    careerId?: string;
    status?: string;
    location?: string;
    hoursPerWeek?: number;
    timelineWeeks?: number;
    certsHeld?: string;
  };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const category = (body.category || "").trim();
  if (!category) {
    return badRequest("category is required.");
  }
  const careerId = (body.careerId || "").trim() || "general";
  const status = body.status === "browsing" ? "browsing" : "applying";
  const location = typeof body.location === "string" ? body.location.trim().slice(0, 100) : "";
  const hoursPerWeek = clampInt(body.hoursPerWeek, 10, 1, 60);
  const timelineWeeks = clampInt(body.timelineWeeks, 2, 0, 52);
  const certsHeld = typeof body.certsHeld === "string" ? body.certsHeld.slice(0, 500) : "";

  const row = await upsertActionPlan(userId, {
    category,
    careerId,
    status,
    location,
    hoursPerWeek,
    timelineWeeks,
    certsHeld,
  });
  return NextResponse.json({ ok: true, plan: row });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { category?: string; careerId?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const category = (body.category || "").trim();
  if (!category) {
    return badRequest("category is required.");
  }
  const careerId = (body.careerId || "").trim() || "general";

  await deleteActionPlan(userId, category, careerId);
  return NextResponse.json({ ok: true });
}
