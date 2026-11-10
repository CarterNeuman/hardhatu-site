import { NextResponse } from "next/server";
import { subscribeToButtondown } from "@/lib/buttondown";

// Receives an email directly and forwards it to Buttondown
// (https://buttondown.com). Historically this was called by the EmailGate
// popup's own email form; that form is gone now (EmailGate opens Clerk's
// sign-in modal instead, and every real signup is subscribed automatically
// via app/api/webhooks/clerk/route.ts), but this route is left in place in
// case anything else on the site still wants a direct "subscribe this
// email" endpoint. The actual Buttondown call lives in lib/buttondown.ts,
// shared with the webhook route.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; source?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const source = (body.source || "unknown").slice(0, 100);
  const honeypot = body.company || "";

  // A real visitor never fills the hidden "company" field. Pretend success
  // so a bot filling every field doesn't learn its submission was rejected.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  await subscribeToButtondown(email, source);
  return NextResponse.json({ ok: true });
}
