import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import {
  getAllContent,
  groupCareersByCategory,
  groupConceptsByCategory,
} from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { Header } from "@/components/Header";
import { NAV_ITEMS_PER_GROUP } from "@/lib/content-client";
import { Footer } from "@/components/Footer";

// Loaded via a plain stylesheet link rather than next/font/google — the
// automated build-time font fetcher has had repeated bugs with these two
// fonts on this Next.js release. A plain <link> is the same approach the
// original design prototype used, and has no build-time moving parts.

// Same SITE_URL env var app/sitemap.ts and app/robots.ts already read,
// falling back to the same https://example.com placeholder so a local
// dev run without it set still produces a valid (if wrong) absolute
// URL instead of crashing `new URL()` below.
const SITE_URL = process.env.SITE_URL || "https://example.com";

export const metadata: Metadata = {
  // Lets every page's relative `openGraph`/`twitter` image paths (and
  // the site-wide app/opengraph-image.tsx / app/twitter-image.tsx
  // fallback below) resolve to a real absolute URL. Missing this was
  // the actual cause of the "no sitewide OG image" gap found in the
  // 2026-11-13 meta/OG audit -- every page already had a title and
  // description, this was the one piece actually absent.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BreakGroundU: Explore Careers & Learn the Industry",
    template: "%s | BreakGroundU",
  },
  description:
    "A free, interconnected guide to construction careers, terms, and the building process, for anyone new to the industry.",
  openGraph: {
    siteName: "BreakGroundU",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const { careers, concepts, getHiredGuides } = getAllContent();
  const careerGroups = groupCareersByCategory(careers);
  const conceptGroups = groupConceptsByCategory(concepts);
  // Get Hired has exactly one guide per career category (no sub-items to
  // group), so the nav just needs it in the site's standard category
  // order, same sort app/get-hired/page.tsx already uses.
  const getHiredOrdered = [...getHiredGuides].sort(
    (a, b) => CAREER_CATEGORY_ORDER.indexOf(a.category) - CAREER_CATEGORY_ORDER.indexOf(b.category)
  );

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        {/* ClerkProvider wraps everything inside <body> rather than <html>
            itself -- Clerk's Core 3 release (2026-03-03) requires this. */}
        <ClerkProvider afterSignOutUrl="/">
          {/* print:hidden on both -- a printed/saved-as-PDF action plan (see
              ActionPlanBuilder's "Print / save as PDF" button) should read
              as a clean document, not a printout of the site's nav chrome. */}
          <div className="print:hidden">
            {/* Slimmed on purpose: Header is a client component, so its
                props are serialized into every page. It only draws a
                title + link for the first few items per category. */}
            <Header
              careerGroups={careerGroups.map((g) => ({
                category: g.category,
                items: g.items
                  .slice(0, NAV_ITEMS_PER_GROUP)
                  .map((c) => ({ id: c.id, type: c.type, slug: c.slug, title: c.title })),
              }))}
              conceptGroups={conceptGroups.map((g) => ({
                category: g.category,
                items: g.items
                  .slice(0, NAV_ITEMS_PER_GROUP)
                  .map((c) => ({ id: c.id, type: c.type, slug: c.slug, title: c.title })),
              }))}
              getHiredGuides={getHiredOrdered.map((g) => ({
                id: g.id,
                type: g.type,
                slug: g.slug,
                category: g.category,
              }))}
              careerCount={careers.length}
              conceptCount={concepts.length}
            />
          </div>
          <main>{children}</main>
          <div className="print:hidden">
            <Footer careerGroups={careerGroups} careerCount={careers.length} />
          </div>
        </ClerkProvider>
        <Analytics />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
