import type { ContentType } from "./types";

// Folder name (under /content) for each content type. Split into its own
// file with zero Node-only imports (no fs/path/gray-matter) so it can be
// imported from both server code (lib/content.ts, the fs-based loader) and
// client components (e.g. Header.tsx, which needs to build a URL for a
// dropdown link) without dragging `fs` into the browser bundle — importing
// anything from lib/content.ts itself from a "use client" file breaks the
// build with "Module not found: Can't resolve 'fs'", since that file's fs
// import gets pulled in transitively even if the client code never calls
// the function that uses it.
export const CONTENT_TYPE_DIR: Record<ContentType, string> = {
  career: "careers",
  concept: "concepts",
  phase: "phases",
  lesson: "lessons",
  software: "software",
  gethired: "get-hired",
  resume: "resumes",
  interview: "interviews",
  exam: "exams",
  cheatsheet: "cheatsheets",
  quiz: "quizzes",
  program: "programs",
};
