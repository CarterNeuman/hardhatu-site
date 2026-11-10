import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { subscribeToButtondown } from "@/lib/buttondown";

// Clerk calls this route whenever an event happens in your Clerk app. Only
// "user.created" is handled -- every new account signup also gets added to
// the Buttondown mailing list, the same list app/api/subscribe already
// feeds.
//
// Setup needed in Clerk's dashboard (Configure -> Webhooks): add an
// endpoint pointing at <your-domain>/api/webhooks/clerk, subscribed to the
// "user.created" event, then copy its "Signing Secret" into this project's
// CLERK_WEBHOOK_SECRET environment variable (locally in .env.local, and in
// Vercel's project settings for production). Needs the `svix` package
// (Clerk signs its webhooks with it) -- run `npm install svix`.
//
// Signature verification matters here specifically because, unlike a
// normal API route, this one is meant to be called by something other than
// your own frontend -- anyone who finds the URL could otherwise POST a fake
// "user.created" event and get arbitrary emails added to the mailing list.
// The svix headers + signing secret are what prove a request actually came
// from Clerk.

type ClerkUserCreatedEvent = {
  type: string;
  data: {
    email_addresses?: { id: string; email_address: string }[];
    primary_email_address_id?: string | null;
  };
};

export async function POST(request: Request) {
  const signingSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!signingSecret) {
    console.error("[clerk-webhook] CLERK_WEBHOOK_SECRET not set, cannot verify incoming webhook");
    return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ ok: false, error: "Missing svix headers." }, { status: 400 });
  }

  // Signature verification needs the exact raw request body, so this reads
  // text rather than calling request.json() (which would re-serialize it
  // and could produce a byte-for-byte different string than what Clerk
  // actually signed).
  const payload = await request.text();

  let event: ClerkUserCreatedEvent;
  try {
    const wh = new Webhook(signingSecret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch (err) {
    console.error("[clerk-webhook] signature verification failed", err);
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "user.created") {
    const addresses = event.data.email_addresses || [];
    const primary = addresses.find((a) => a.id === event.data.primary_email_address_id) || addresses[0];
    if (primary?.email_address) {
      await subscribeToButtondown(primary.email_address, "clerk-signup");
    } else {
      console.warn("[clerk-webhook] user.created event had no email address", event.data);
    }
  }

  return NextResponse.json({ ok: true });
}
