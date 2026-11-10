import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProgressForUser, upsertProgress, deleteProgress } from "@/lib/db";

// The one endpoint the site's "mark complete" UI (not built yet -- this
// is the backend plumbing for it) will call:
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

  let body: { contentType?: string; contentId?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const contentType = (body.contentType || "").trim();
  const contentId = (body.contentId || "").trim();
  if (!contentType || !contentId) {
    return badRequest("contentType and contentId are required.");
  }

  const rows = await upsertProgress(userId, contentType, contentId);
  return NextResponse.json({ ok: true, progress: rows[0] });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { contentType?: string; contentId?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const contentType = (body.contentType || "").trim();
  const contentId = (body.contentId || "").trim();
  if (!contentType || !contentId) {
    return badRequest("contentType and contentId are required.");
  }

  await deleteProgress(userId, contentType, contentId);
  return NextResponse.json({ ok: true });
}
