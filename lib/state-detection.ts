// State personalization (Explore menu's recommended guide, and the
// pre-fill for the "what state are you in?" pickers). Built now, kept
// invisible behind SHOW_STATE_DETECTION until the state guide rollout
// is far enough along that recommending one makes sense -- see
// claude/state-guides-rollout.md.
//
// Two signals feed this, both stored as cookies (lib/state-cookies.ts):
//  - a soft, re-guessable guess from the visitor's IP, set by
//    middleware.ts on every request from Vercel's own edge geolocation
//    headers (no third-party call, no permission prompt, no extra cost);
//  - an explicit choice from one of the "what state are you in?"
//    pickers (components/StateDetectionPicker.tsx), stored by the
//    setStatePreference server action (app/actions/set-state-preference.ts).
// An explicit choice always outranks the guess, and either way this
// only ever resolves to a state whose guide is actually published --
// recommending one of the still-hidden states would be a 404.
import { cookies } from "next/headers";
import { STATE_GUIDES, type StateGuide } from "@/lib/state-guides";
import { CHOSEN_STATE_COOKIE, DETECTED_STATE_COOKIE } from "@/lib/state-cookies";

export const SHOW_STATE_DETECTION = process.env.SHOW_STATE_DETECTION === "1";

export function findPublishedStateByCode(code: string | undefined | null): StateGuide | undefined {
  if (!code) return undefined;
  const upper = code.toUpperCase();
  return STATE_GUIDES.find((g) => g.code === upper);
}

// For the Explore menu: the one state, if any, to call out above "All
// state guides". Returns undefined whenever the feature is off, so
// app/layout.tsx and components/Header.tsx need no separate flag check.
export async function getRecommendedStateGuide(): Promise<StateGuide | undefined> {
  if (!SHOW_STATE_DETECTION) return undefined;
  const jar = await cookies();
  const chosen = jar.get(CHOSEN_STATE_COOKIE)?.value;
  const detected = jar.get(DETECTED_STATE_COOKIE)?.value;
  return findPublishedStateByCode(chosen) ?? findPublishedStateByCode(detected);
}

// For the pickers themselves: whichever state is already known, so
// returning visitors see their own state pre-selected instead of a
// blank dropdown. Ignores SHOW_STATE_DETECTION on purpose -- the pages
// that render a picker already gate it behind the flag themselves.
export async function getKnownStateCode(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(CHOSEN_STATE_COOKIE)?.value ?? jar.get(DETECTED_STATE_COOKIE)?.value;
}
