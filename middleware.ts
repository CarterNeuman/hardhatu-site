import { NextResponse, type NextRequest } from "next/server";
import { DETECTED_STATE_COOKIE, STATE_COOKIE_MAX_AGE } from "@/lib/state-cookies";

// A soft, invisible-until-launched guess at which state a visitor is in,
// read from Vercel's own edge geolocation headers -- no third-party
// call, no cost, no permission prompt. Runs on every page request
// (cheap: header reads only) so that by the time SHOW_STATE_DETECTION
// flips on (see lib/state-detection.ts and
// claude/state-guides-rollout.md), returning visitors already have a
// guess in place instead of starting from nothing.
//
// This NEVER overwrites an explicit choice from one of the "what state
// are you in?" pickers (components/StateDetectionPicker.tsx) -- that's
// a separate, stickier cookie (lib/state-cookies.ts) this one sits
// underneath; lib/state-detection.ts is what combines the two.
//
// Imports only lib/state-cookies.ts, never lib/state-detection.ts or
// lib/state-guides.ts, so this edge function doesn't have to carry all
// 11 state guides' worth of data on every request.
export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  const response = NextResponse.next();
  if (country === "US" && region) {
    response.cookies.set(DETECTED_STATE_COOKIE, region, {
      maxAge: STATE_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}

// Skip static assets and API routes -- no reason to run this on every
// image, font or JSON fetch.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|api/).*)"],
};
