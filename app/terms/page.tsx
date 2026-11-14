import type { Metadata } from "next";
import Link from "next/link";

const CONTACT_EMAIL = "contact@breakgroundu.com";
const LAST_UPDATED = "November 14, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using BreakGroundU's free construction career and education content.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">Terms of Service</h1>
      <p className="mt-3 text-sm text-steel">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Using this site</h2>
          <p className="mt-3">
            By reading or using BreakGroundU, you agree to these terms. BreakGroundU is a free
            educational resource about construction careers, terminology, and the building
            process, provided by an independent operator referred to here as "BreakGroundU,"
            "we," or "us."
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Accounts</h2>
          <p className="mt-3">
            Careers and Concepts are free to read without an account. Lessons, Interview Prep,
            Exam Prep, Get Hired guidance, Resume Guides, Phases, Software profiles, and the
            Action Plan require a free account; the Career Match Quiz can be taken by anyone, but
            you need to sign in to see your result. Accounts are free, there is no paid tier
            today.
          </p>
          <p className="mt-3">
            You must be at least 13 years old to create an account. If you're under 18, please
            review these terms and our Privacy Policy with a parent or guardian first. Sign-in is handled by our
            authentication provider (Clerk), using either a one-time emailed code or a Google
            account; we don't collect or store a password ourselves. You're responsible for
            keeping your sign-in method (your email inbox, or your Google account) secure, since
            whoever controls it can sign in as you.
          </p>
          <p className="mt-3">
            We may suspend or terminate an account that violates these terms. You can delete your
            own account at any time, see the Privacy Policy's "Data retention and deletion"
            section for how. For what account information we collect and how it's used, see our{" "}
            <Link
              href="/privacy"
              className="text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Acceptable use</h2>
          <p className="mt-3">
            Please use BreakGroundU the way it's meant to be used: to learn and to plan. Don't try
            to break, overload or get around the site's security or sign-in; don't scrape or bulk
            copy the site's content or data with automated tools; don't create accounts with
            someone else's email; and don't use the site for anything unlawful.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Educational purpose only</h2>
          <p className="mt-3">
            Everything on BreakGroundU is for general education and orientation, not
            professional, legal, safety, or career advice specific to your situation.
            Licensing requirements, certification exams, wage figures, and regulations
            (OSHA rules, state licensing boards, and similar) change over time and vary by
            state and locality. Always verify current requirements directly with the
            relevant licensing board, employer, or official source before relying on them
            for a real decision.
          </p>
          <p className="mt-3">
            The Career Match Quiz is a quick, self-reported starting point for exploring careers
            that might fit you, not a vocational assessment, aptitude test, or guarantee of fit or
            employability in any career it surfaces.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Free to use</h2>
          <p className="mt-3">
            Careers and Concepts are free to read and will stay that way. Account sign-in for the
            rest of the site's content is also free today, there's no paid subscription or paywall
            on BreakGroundU right now. If that ever changes, this page will be updated first, and
            any content that's free today won't be moved behind a paywall without notice here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Content ownership</h2>
          <p className="mt-3">
            The text, structure, and original illustrations on BreakGroundU belong to BreakGroundU
            unless otherwise noted. You're welcome to link to any page. Copying substantial
            portions of the site's own writing elsewhere without permission isn't
            permitted, reach out if you'd like to use something beyond a normal link or
            short quote.
          </p>
          <p className="mt-3">
            <span className="font-semibold">For counselors, teachers and parents:</span> you may
            print, copy and share the handouts, posters, state guides and individual pages for
            non-commercial educational use with students and families, as long as you keep the
            BreakGroundU name on them.
          </p>
          <p className="mt-3">
            Pay figures come largely from the U.S. Bureau of Labor Statistics and other public
            government data, credited where they're used. If you believe something
            on BreakGroundU infringes your copyright, email us at the address below with the page
            and the work involved, and we'll review it and remove it if it does.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Third parties, programs and trademarks</h2>
          <p className="mt-3">
            Some pages link to outside websites or embed videos from services like YouTube.
            BreakGroundU doesn't control that content and isn't responsible for it. Those
            services have their own terms, which apply once you follow a link or play an
            embedded video. This is separate from the sign-in, hosting, and email providers that
            help run BreakGroundU itself, which the Privacy Policy covers.
          </p>
          <p className="mt-3">
            Training programs, schools, unions, apprenticeships, employers, software and
            certifications described on BreakGroundU are independent organizations. We don't run
            them, and describing or linking to one isn't an endorsement or a guarantee of
            admission, employment, pay or results. Check details directly with the organization.
            If BreakGroundU ever receives payment from an organization it features, we'll say so
            clearly next to that listing.
          </p>
          <p className="mt-3">
            Product, company, union and program names used on BreakGroundU are trademarks of
            their respective owners and are used only to identify them. BreakGroundU isn't
            affiliated with or sponsored by them unless we say so.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">No warranty</h2>
          <p className="mt-3">
            BreakGroundU is provided "as is," with no guarantee that every fact is current or
            error-free. We make a genuine effort to keep information accurate and to fix
            mistakes that are reported, but the site is offered without warranties of any
            kind, and use of it is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, BreakGroundU isn't liable for any decision
            made or outcome experienced based on information found on this site. This
            includes career, financial, and educational decisions of any kind.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Governing law</h2>
          <p className="mt-3">
            These terms are governed by the laws of the State of Georgia, without regard to its
            conflict-of-law rules. If any part of these terms is found unenforceable, the rest
            stays in effect.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Changes</h2>
          <p className="mt-3">
            BreakGroundU may update its content, features, or these terms at any time. Material
            changes, especially around accounts or paid features, will update the date at
            the top of this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Contact</h2>
          <p className="mt-3">
            Questions about these terms can go to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
