import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { DETECTED_STATE_COOKIE, STATE_COOKIE_MAX_AGE } from "@/lib/state-cookies";

// Next.js 16 renamed middleware.ts -> proxy.ts (same request-interception
// mechanism, just a new file name/export) -- there can only be one, so the
// state-detection geo cookie (see lib/state-detection.ts) is folded into
// this same proxy rather than living in its own middleware.ts.
//
// clerkMiddleware() just attaches auth state to every request; it does NOT
// lock any page behind a login by itself. Nothing on the site requires
// signing in to view -- this exists so server code (API routes, server
// components) can read "is someone signed in" via auth() from
// "@clerk/nextjs/server". Page-level login walls, if any are ever added, go
// through auth.protect() in that specific route, not here.
//
// The geo-cookie part: reads Vercel's edge geo headers and sets a soft,
// per-visit guess at the visitor's state (no third-party call, no cost).
// Invisible today -- SHOW_STATE_DETECTION is off everywhere -- but it's
// cheap to always run, so returning visitors already have a guess in place
// the day the flag flips on. Only ever a soft guess: the explicit, sticky
// cookie set by app/actions/set-state-preference.ts always outranks it (see
// getRecommendedStateGuide/getKnownStateCode in lib/state-detection.ts).
export default clerkMiddleware((_auth, request) => {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  if (country === "US" && region) {
    response.cookies.set(DETECTED_STATE_COOKIE, region, {
      maxAge: STATE_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
});

export const config = {
  matcher: [
    // Skip Next's internals and static files, unless they're referenced in
    // search params (Clerk's own recommended default matcher).
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
