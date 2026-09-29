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

    // Buttondown rejects creating a subscriber that's already on the list
    // rather than updating it (its default duplicate-protection behavior),
    // normally as a 400 but occasionally surfaced as a 409. Either way,
    // this person is already subscribed, so from the visitor's side that's
    // success, not an error, they should never be blocked from reading just
    // because they reused an email they already gave us.
    //
    // More generally, this gate is a soft lead-capture step, not a real
    // security boundary (see the top-of-file note on EmailGate), so any
    // failure past this point favors letting the visitor keep reading over
    // showing them an error: a rate-limited, misconfigured, or otherwise
    // failing Buttondown call is logged here for us to notice, never
    // surfaced to the visitor as a blocker.
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn(`[subscribe] Buttondown returned ${res.status} for ${email} (source: ${source}): ${detail}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] network error contacting Buttondown", err);
    // Same reasoning: a transient network failure reaching Buttondown
    // shouldn't block the visitor from continuing either.
    return NextResponse.json({ ok: true });
  }
}
