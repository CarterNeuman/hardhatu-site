import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@breakgroundu.com";
const LAST_UPDATED = "November 10, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What BreakGroundU collects, what it doesn't, and how that information is used.",
};

const linkClass =
  "text-amber underline decoration-amber/40 underline-offset-2 hover:text-clay hover:decoration-clay";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-steel">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-3">
            BreakGroundU is a construction career and education site provided by an independent
            operator, referred to here as "BreakGroundU," "we," or "us." Careers and Concepts are
            free to read without an account. Lessons, Interview Prep, Exam Prep, Get Hired
            guidance, Resume Guides, Phases, Software profiles, and the Action Plan require a free
            account to access; the Career Match Quiz can be taken by anyone, but you need to sign
            in to see your result. This policy explains what information BreakGroundU collects
            because of that, how it's used, and what stays automatic and anonymous. If you have
            questions, reach out at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Information you provide to us</h2>
          <p className="mt-3">
            Creating an account is optional, and only needed for the content and features listed
            above. If you create one, we collect:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold">Your email address.</span> Required to sign in,
              whether by a one-time emailed code or by signing in with Google.
            </li>
            <li>
              <span className="font-semibold">Basic profile info from Google, if you use it to sign in.</span>{" "}
              Google shares your name and profile photo with our sign-in provider; we don't ask
              for anything beyond that, and we never see or store your Google password.
            </li>
          </ul>
          <p className="mt-3">
            We don't handle passwords directly at all. Sign-in itself is handled by Clerk, a
            third-party authentication provider described below; BreakGroundU never sees a
            password you create with them.
          </p>
          <p className="mt-3">
            When you create an account, your email is also added to our mailing list, see "Email
            and newsletter" below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            Information collected automatically from your account
          </h2>
          <p className="mt-3">Once you're signed in, we store:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold">Progress on content you mark complete</span> (which
              lessons, exam-prep guides, and similar items), so the site can show you what you've
              already finished.
            </li>
            <li>
              <span className="font-semibold">Your Career Match Quiz result</span>, if you're
              signed in when you reach the result screen: which career category you matched with
              and which specific careers the quiz surfaced for you.
            </li>
          </ul>
          <p className="mt-3">
            Neither of these is shared outside BreakGroundU tied to your identity. We do review
            this data in aggregate, anonymized form (for example, how many people completed a
            given lesson, or how quiz results are distributed across career categories) to decide
            what content to build next, and, potentially, to describe our audience in general
            terms to prospective partners or advertisers. That aggregate review never identifies
            an individual visitor, and we do not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Email and newsletter</h2>
          <p className="mt-3">
            Creating an account automatically adds your email to our mailing list, sent through
            Buttondown, which we use for occasional site updates and a newsletter. You can
            unsubscribe at any time using the link in any email we send; unsubscribing stops the
            emails but doesn't delete your account. Emails sent through Buttondown may include
            standard open and click tracking, the same as most email services use, see{" "}
            <a href="https://buttondown.com/legal/privacy" className={linkClass}>
              Buttondown's own privacy policy
            </a>{" "}
            for how they handle that.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Traffic analytics</h2>
          <p className="mt-3">
            Separately from account data, the site uses Vercel Analytics and Google Analytics to
            understand aggregate traffic: which pages get read, roughly how visitors arrive, and
            general location (city/region level, from IP address), device, and browser
            information. Vercel Analytics runs without setting tracking cookies. Google Analytics
            does set cookies, described below. Neither tool is used to identify a specific person,
            and this traffic data isn't combined with your account information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Cookies</h2>
          <p className="mt-3">
            <span className="font-semibold">Analytics cookies.</span> Google Analytics sets a
            small number of cookies on this site, mainly <code className="text-sm">_ga</code> and{" "}
            <code className="text-sm">_ga_*</code>, which last up to about two years. They don't
            contain your name or anything directly identifying, just a randomly generated ID used
            to recognize that the same browser has visited before. Vercel Analytics does not set
            any cookies. You can block or delete these cookies through your browser's settings at
            any time, or use Google's{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className={linkClass}>
              Analytics Opt-out Browser Add-on
            </a>{" "}
            to stop Google Analytics from seeing your visits to any site, not just this one.
          </p>
          <p className="mt-3">
            <span className="font-semibold">Sign-in cookies.</span> If you create an account, our
            authentication provider (Clerk) sets a cookie that keeps you signed in between visits.
            This one is strictly functional: it isn't used for advertising or tracking you across
            other sites, and it's required for sign-in to work at all. It clears automatically
            after a period of inactivity or when you sign out.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Third-party services we use</h2>
          <p className="mt-3">
            A few outside services help run BreakGroundU and process data on our behalf, each
            bound by their own privacy terms:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold">Clerk,</span> handles account sign-in, including
              Google sign-in, and stores your email and basic profile info.
            </li>
            <li>
              <span className="font-semibold">Neon,</span> hosts the database that stores your
              progress and quiz-result data.
            </li>
            <li>
              <span className="font-semibold">Buttondown,</span> manages our mailing list and
              sends the emails described above.
            </li>
            <li>
              <span className="font-semibold">Vercel,</span> hosts the site and provides Vercel
              Analytics.
            </li>
            <li>
              <span className="font-semibold">Google,</span> provides Google Analytics and, if you
              choose to use it, Google sign-in.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Data retention and deletion</h2>
          <p className="mt-3">
            We keep your account, progress, and quiz-result data for as long as your account
            exists. To delete your account and the data tied to it, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            and we'll remove your stored progress and quiz results, remove your email from the
            mailing list, and delete your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Third-party links</h2>
          <p className="mt-3">
            Some pages, particularly the software profiles, link out to third-party websites and
            embed YouTube videos. Those sites and services have their own privacy practices, which
            this policy doesn't cover. Visiting or interacting with them is subject to their own
            terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Children's privacy</h2>
          <p className="mt-3">
            BreakGroundU is written with high schoolers and other newcomers to the industry in
            mind. Account sign-in doesn't currently ask for or verify age. If you believe a child
            has created an account or provided information without appropriate consent, contact us
            at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            and we'll remove it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Changes to this policy</h2>
          <p className="mt-3">
            As BreakGroundU adds features, this policy will be updated to match, and the "Last
            updated" date at the top will change whenever it does. We'll make a reasonable effort
            to call out material changes clearly rather than folding them in quietly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Contact</h2>
          <p className="mt-3">
            Questions about this policy or how the site handles information can go to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
