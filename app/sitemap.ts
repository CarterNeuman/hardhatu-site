import type { MetadataRoute } from "next";
import { getAllContent, urlFor } from "@/lib/content";
import { STATE_GUIDES } from "@/lib/state-guides";

// Next.js serves this at /sitemap.xml automatically. Regenerates from
// whatever's in /content — you never hand-maintain a URL list.
const SITE_URL = process.env.SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const { all } = getAllContent();

  const pages = all.map((node) => ({
    url: `${SITE_URL}${urlFor(node)}`,
    lastModified: node.lastReviewed ? new Date(node.lastReviewed) : new Date(),
  }));

  const staticPages = ["/about", "/contact", "/privacy", "/terms", "/student-loan-roi", "/states", ...STATE_GUIDES.map((g) => `/states/${g.slug}`)].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  return [{ url: SITE_URL, lastModified: new Date() }, ...staticPages, ...pages];
}
