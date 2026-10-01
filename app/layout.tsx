import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import {
  getAllContent,
  groupCareersByCategory,
  groupInterviewsByCategory,
  groupConceptsByCategory,
} from "@/lib/content";
import { CAREER_CATEGORY_ORDER } from "@/lib/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Loaded via a plain stylesheet link rather than next/font/google — the
// automated build-time font fetcher has had repeated bugs with these two
// fonts on this Next.js release. A plain <link> is the same approach the
// original design prototype used, and has no build-time moving parts.

export const metadata: Metadata = {
  title: {
    default: "HardHatU: Explore Careers & Learn the Industry",
    template: "%s | HardHatU",
  },
  description:
    "A free, interconnected guide to construction careers, terms, and the building process, for anyone new to the industry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const { careers, interviews, concepts, getHiredGuides } = getAllContent();
  const careerGroups = groupCareersByCategory(careers);
  const interviewGroups = groupInterviewsByCategory(interviews);
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
        <Header
          careerGroups={careerGroups}
          interviewGroups={interviewGroups}
          conceptGroups={conceptGroups}
          getHiredGuides={getHiredOrdered}
          careerCount={careers.length}
          interviewCount={interviews.length}
          conceptCount={concepts.length}
        />
        <main>{children}</main>
        <Footer careerGroups={careerGroups} careerCount={careers.length} />
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
