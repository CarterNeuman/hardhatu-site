// Shared helper for subscribing an email to Buttondown
// (https://buttondown.com). Used by both app/api/subscribe/route.ts (the
// EmailGate's old-style direct subscribe, kept for any other callers) and
// app/api/webhooks/clerk/route.ts (every real account signup also joins the
// list). Never throws: a failure here should never block whichever route
// called it, so every outcome -- missing key, a Buttondown error, a network
// failure -- is logged and swallowed rather than surfaced as an error.

export async function subscribeToButtondown(email: string, source: string): Promise<void> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    // No email service connected. Log it server-side (visible in your
    // deployment's function logs) so nothing is silently lost.
    console.warn(`[buttondown] BUTTONDOWN_API_KEY not set, would have subscribed ${email} (source: ${source})`);
    return;
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
        // Buttondown defaults an API-created subscriber to "unactivated" and
        // sends its own double opt-in confirmation email. Explicitly mark
        // them as a regular, already-active subscriber instead -- both call
        // sites here represent someone who already took a real action
        // (submitted the gate form, or created a real account), not a cold
        // import that needs separate confirmation.
        type: "regular",
      }),
    });

    // Buttondown rejects creating a subscriber that's already on the list
    // rather than updating it (its default duplicate-protection behavior),
    // normally as a 400 but occasionally surfaced as a 409. Either way,
    // this person is already subscribed, which is fine -- not logged as an
    // error, only a genuine failure is.
    if (!res.ok && res.status !== 400 && res.status !== 409) {
      const detail = await res.text().catch(() => "");
      console.warn(`[buttondown] returned ${res.status} for ${email} (source: ${source}): ${detail}`);
    }
  } catch (err) {
    console.error("[buttondown] network error contacting Buttondown", err);
  }
}
