import { NextResponse } from "next/server";

// Receives an email from the EmailGate component and forwards it to
// Buttondown (https://buttondown.com), the email tool this project uses
// both for this lead-capture step and for the monthly newsletter planned
// once real accounts exist. Needs a BUTTONDOWN_API_KEY environment
// variable (from a free Buttondown account's API settings) to actually
// send anywhere; see the note below for what happens without one.

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

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    // No email service connected yet. Log it server-side (visible in your
    // deployment's function logs) so nothing is silently lost, but still
    // let the visitor through so the gate itself works end to end before a
    // real API key is added. Once BUTTONDOWN_API_KEY is set, this branch
    // stops running and real subscribers start landing in Buttondown.
    console.warn(`[subscribe] BUTTONDOWN_API_KEY not set, would have subscribed ${email} (source: ${source})`);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        tags: [source],
        // Buttondown defaults an API-created subscriber to "unactivated"
        // and sends its own double opt-in confirmation email. That would
        // contradict the gate's whole point (enter your email, keep
        // reading immediately), so this explicitly marks them as a
        // regular, already-active subscriber instead.
        type: "regular",
      }),
    });

    // Buttondown returns 201 on a brand-new subscriber and 400 when the
    // email is already on the list (its default duplicate-protection
    // behavior). Either way this person is on the list, so both count as
    // success from the visitor's side, only a genuine service error should
    // block them from continuing.
    if (res.ok || res.status === 400) {
      return NextResponse.json({ ok: true });
    }

    const detail = await res.text();
    console.error(`[subscribe] Buttondown error ${res.status}: ${detail}`);
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 502 });
  } catch (err) {
    console.error("[subscribe] network error contacting Buttondown", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 502 });
  }
}
