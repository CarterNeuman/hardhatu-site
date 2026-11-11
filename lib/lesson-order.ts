// A flat recommended order across all lessons, for "what's next" logic
// (currently just My Progress's "Up next" card). Reuses the Learning
// Blueprint's own declared layout (lib/lessons-blueprint-data.ts) rather
// than inventing a second ordering: the 22 main-road stops in their
// numbered order, then each branch's lessons in the order that branch
// declares them. Branches come after the full main road -- the core
// path is the "intended" sequence, branches are the bonus detours, so a
// visitor who hasn't finished the main road gets pointed back to it
// first rather than into a branch.
import { BLUEPRINT_LAYOUT, BLUEPRINT_BRANCHES } from "@/lib/lessons-blueprint-data";

export const ORDERED_LESSON_SLUGS: string[] = [
  ...[...BLUEPRINT_LAYOUT].sort((a, b) => a.n - b.n).map((stop) => stop.slug),
  ...BLUEPRINT_BRANCHES.flatMap((branch) => branch.lessons.map((l) => l.slug)),
];
