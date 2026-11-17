"use server";

// Called by components/StateDetectionPicker.tsx wherever it's rendered
// (Career Quiz, Action Plan, College vs. Trades -- all currently behind
// SHOW_STATE_DETECTION, see lib/state-detection.ts). Stores an explicit
// "what state are you in?" choice as the sticky cookie that outranks
// middleware.ts's soft IP guess, and that the Explore menu's recommended
// state reads back.
import { cookies } from "next/headers";
import { CHOSEN_STATE_COOKIE, STATE_COOKIE_MAX_AGE } from "@/lib/state-cookies";
import { findPublishedStateByCode } from "@/lib/state-detection";

export async function setStatePreference(code: string): Promise<void> {
  // Validate against the published guide list server-side -- never trust
  // the raw string a client sends, and never store a code for a state
  // that isn't actually live (one of the still-hidden guides, or junk).
  const guide = findPublishedStateByCode(code);
  if (!guide) return;
  (await cookies()).set(CHOSEN_STATE_COOKIE, guide.code, {
    maxAge: STATE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}
