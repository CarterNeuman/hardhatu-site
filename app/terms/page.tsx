import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@hardhatu.com";
const LAST_UPDATED = "September 29, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using HardHatU's free construction career and education content.",
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
            By reading or using HardHatU, you agree to these terms. HardHatU is a free
            educational resource about construction careers, terminology, and the building
            process, provided by an independent operator referred to here as "HardHatU,"
            "we," or "us."
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Educational purpose only</h2>
          <p className="mt-3">
            Everything on HardHatU is for general education and orientation, not
            professional, legal, safety, or career advice specific to your situation.
            Licensing requirements, certification exams, wage figures, and regulations
            (OSHA rules, state licensing boards, and similar) change over time and vary by
            state and locality. Always verify current requirements directly with the
            relevant licensing board, employer, or official source before relying on them
            for a real decision.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Free to use</h2>
          <p className="mt-3">
            The careers and concepts sections are free to read and will stay that way.
            Some future sections (deeper lessons, interview prep, exam prep) may eventually
            require a free account or a subscription. There are no accounts or paid
            features today, and this page will be updated before that changes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Content ownership</h2>
          <p className="mt-3">
            The text, structure, and original illustrations on HardHatU belong to HardHatU
            unless otherwise noted. You're welcome to link to any page. Copying substantial
            portions of the site's own writing elsewhere without permission isn't
            permitted, reach out if you'd like to use something beyond a normal link or
            short quote.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Third-party links and videos</h2>
          <p className="mt-3">
            Some pages link to outside websites or embed videos from services like YouTube.
            HardHatU doesn't control that content and isn't responsible for it. Those
            services have their own terms, which apply once you follow a link or play an
            embedded video.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">No warranty</h2>
          <p className="mt-3">
            HardHatU is provided "as is," with no guarantee that every fact is current or
            error-free. We make a genuine effort to keep information accurate and to fix
            mistakes that are reported, but the site is offered without warranties of any
            kind, and use of it is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, HardHatU isn't liable for any decision
            made or outcome experienced based on information found on this site. This
            includes career, financial, and educational decisions of any kind.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Changes</h2>
          <p className="mt-3">
            HardHatU may update its content, features, or these terms at any time. Material
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
