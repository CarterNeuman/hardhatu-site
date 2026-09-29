import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@hardhatu.com";
const LAST_UPDATED = "September 29, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What HardHatU collects, what it doesn't, and how that may change over time.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-steel">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-3">
            HardHatU is a free reference site operated independently, referred to here as
            "HardHatU," "we," or "us." This policy explains what information the site
            collects today and how that may change as new features are added. If you have
            questions, reach out at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">What we collect today</h2>
          <p className="mt-3">
            HardHatU does not currently have user accounts, sign-ups, comments, or any form
            that collects personal information. There is nothing to fill in and nothing to
            submit, you can read the entire site anonymously.
          </p>
          <p className="mt-3">
            The site uses Vercel Analytics to understand aggregate traffic, which pages get
            read, and roughly how visitors arrive. This runs without setting tracking
            cookies and without building a profile tied to any individual visitor. It tells
            us that a page was viewed, not who viewed it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Cookies</h2>
          <p className="mt-3">
            HardHatU does not set its own cookies. If that changes, this section will be
            updated to say exactly what's set and why before it happens.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Third-party links</h2>
          <p className="mt-3">
            Some pages, particularly the software profiles, link out to third-party
            websites and embed YouTube videos. Those sites and services have their own
            privacy practices, which this policy doesn't cover. Visiting or interacting
            with them is subject to their own terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Children's privacy</h2>
          <p className="mt-3">
            HardHatU is written with high schoolers and other newcomers to the industry in
            mind, and the site does not knowingly collect personal information from anyone,
            regardless of age, since there's currently no mechanism to submit any. If that
            ever changes for a future feature, this policy will be updated first and any
            protections required for younger visitors will be built in before that feature
            launches.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">What may change</h2>
          <p className="mt-3">
            HardHatU plans to eventually offer optional accounts for some deeper study
            content (lessons, interview prep, and exam prep), while careers and concepts
            stay free and open. If and when accounts launch, this policy will be rewritten
            to explain exactly what account information is collected, how it's stored, and
            how it's used, and that update will be dated and called out clearly, not
            folded in quietly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Contact</h2>
          <p className="mt-3">
            Questions about this policy or how the site handles information can go to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
