import type { MetadataRoute } from "next";
import { getAllContent, urlFor } from "@/lib/content";
import { STATE_GUIDES } from "@/lib/state-guides";

// Next.js serves this at /sitemap.xml automatically. Regenerates from
// whatever's in /content — you never hand-maintain a URL list.
const SITE_URL = process.env.SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const { all } = getAllContent();

  // Action plans are templates the Action Plan builder reads; they have no
  // page of their own, so listing them would hand search engines 404s.
  const pages = all.filter((node) => node.type !== "actionplan").map((node) => ({
    url: `${SITE_URL}${urlFor(node)}`,
    lastModified: node.lastReviewed ? new Date(node.lastReviewed) : new Date(),
  }));

  const indexPages = ["/careers", "/concepts", "/phases", "/lessons", "/software", "/get-hired", "/resumes", "/interviews", "/exams", "/programs", "/quizzes", "/action-plan", "/resources"];
  const staticPages = [...indexPages, "/about", "/contact", "/privacy", "/terms", "/accessibility", "/student-loan-roi", "/states", "/counselors", "/counselors/parent-handout", "/counselors/poster", ...STATE_GUIDES.map((g) => `/states/${g.slug}`)].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  return [{ url: SITE_URL, lastModified: new Date() }, ...staticPages, ...pages];
}
