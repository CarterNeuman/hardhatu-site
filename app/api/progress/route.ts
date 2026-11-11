import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProgressForUser, upsertProgress, deleteProgress } from "@/lib/db";

// The one endpoint the site's "mark complete" UI calls (the Lesson
// page's MarkCompleteButton, the Learning Blueprint's completed-stop
// checkmarks, and the Action Plan's day-by-day checkboxes):
//   GET    /api/progress              -> everything the signed-in user has marked done
//   POST   /api/progress   {contentType, contentId}         -> mark one thing done
//   DELETE /api/progress   {contentType, contentId}         -> un-mark it
//
// Every method requires a signed-in Clerk session -- there is no
// anonymous/guest progress, by design, since there's nowhere to attach it
// to without an account.

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

// Only the content types the site actually writes are accepted, and
// ids are length-capped -- without this, any signed-in account could
// fill the table with arbitrary rows of arbitrary size (and those rows
// would show up in the admin dashboard's completion counts). Add a new
// type here when a new "mark complete" surface is built.
const ALLOWED_CONTENT_TYPES = new Set(["lesson", "actionPlanStep"]);
const MAX_CONTENT_ID_LENGTH = 200;

function parseProgressBody(body: { contentType?: unknown; contentId?: unknown }):
  | { contentType: string; contentId: string }
  | { error: string } {
  const contentType = typeof body.contentType === "string" ? body.contentType.trim() : "";
  const contentId = typeof body.contentId === "string" ? body.contentId.trim() : "";
  if (!contentType || !contentId) {
    return { error: "contentType and contentId are required." };
  }
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    return { error: "Unknown contentType." };
  }
  if (contentId.length > MAX_CONTENT_ID_LENGTH) {
    return { error: "contentId is too long." };
  }
  return { contentType, contentId };
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  const rows = await getProgressForUser(userId);
  return NextResponse.json({ ok: true, progress: rows });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { contentType?: unknown; contentId?: unknown };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const parsed = parseProgressBody(body ?? {});
  if ("error" in parsed) {
    return badRequest(parsed.error);
  }
  const { contentType, contentId } = parsed;

  const rows = await upsertProgress(userId, contentType, contentId);
  return NextResponse.json({ ok: true, progress: rows[0] });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { contentType?: unknown; contentId?: unknown };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const parsed = parseProgressBody(body ?? {});
  if ("error" in parsed) {
    return badRequest(parsed.error);
  }
  const { contentType, contentId } = parsed;

  await deleteProgress(userId, contentType, contentId);
  return NextResponse.json({ ok: true });
}
