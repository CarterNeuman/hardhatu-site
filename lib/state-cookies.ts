// Cookie names and lifetime for the (currently invisible) state
// personalization feature: a soft IP-based guess plus an explicit
// "what state are you in?" choice, combined by lib/state-detection.ts
// and read by components/Header.tsx's Explore menu and
// components/StateDetectionPicker.tsx's pre-fill.
//
// middleware.ts (edge runtime) imports only this file, never
// lib/state-detection.ts or lib/state-guides.ts, so the per-request edge
// function never has to load all 11 state guides' worth of data.
//
// See claude/state-guides-rollout.md for when this is meant to go live.

// A soft, re-guessable signal from the visitor's IP via Vercel's edge
// geolocation headers (middleware.ts). Refreshed on every visit.
export const DETECTED_STATE_COOKIE = "bgu_state_detected";

// An explicit choice from one of the "what state are you in?" pickers
// (the Career Quiz, Action Plan and College vs. Trades pages). Sticky:
// middleware.ts never overwrites this one, and it always outranks the
// soft guess above.
export const CHOSEN_STATE_COOKIE = "bgu_state_chosen";

export const STATE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
