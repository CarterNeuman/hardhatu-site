// The faint drafting grid behind the Blueprint's dark bands (the page
// hero, the result header, the form's live preview): two hairline
// gradients, no image request.
//
// Lives in lib/, not in a component file, on purpose: the hero is
// rendered by a Server Component (app/action-plan/page.tsx) and the
// other two by client components. A plain value exported from a
// "use client" module is only a reference when a Server Component
// imports it (same trap as CATEGORY_SLUG -- see lib/content-client.ts),
// so anything both sides need has to come from a shared module.
export const BLUEPRINT_GRID = {
  backgroundImage:
    "linear-gradient(rgba(239,237,230,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(239,237,230,0.055) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
} as const;
