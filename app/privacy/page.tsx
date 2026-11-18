import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@breakgroundu.com";
const LAST_UPDATED = "November 17, 2026";

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
            <li>
              <span className="font-semibold">Action Plans you save</span>: the career you chose,
              whether you're applying now or still exploring, the location you typed in (a city,
              state or ZIP code), the hours per week and timeline you picked, any certifications
              you said you already hold, and which plan steps you've checked off.
            </li>
          </ul>
          <p className="mt-3">
            None of this is shared outside BreakGroundU tied to your identity. We do review this
            data in aggregate, anonymized form (for example, how many people completed a given
            lesson, how quiz results are distributed across career categories, or which states
            people are planning job searches in) to decide what content to build next and,
            potentially, to describe our audience in general terms to partners such as schools,
            training programs and employers. That aggregate review never identifies an individual
            visitor.
          </p>
          <p className="mt-3">
            <span className="font-semibold">We do not sell personal information</span>, and we do
            not share it with anyone for targeted or behavioral advertising. BreakGroundU does not
            run ads.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            Information stored in your browser
          </h2>
          <p className="mt-3">
            A few features remember small things in your own browser (using its local or session
            storage) rather than on our servers: for example, that you already dismissed a sign-in
            prompt, how long a lesson preview has been open, an unsaved quiz result while you sign
            in, or that you have already seen an intro animation. This stays on your device and
            you can clear it at any time through your browser's settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Searches you run</h2>
          <p className="mt-3">
            If you look for live job openings from an Action Plan, the trade and location you
            searched for are sent from our server to our job-listing provider (Adzuna) to fetch
            results. Your name, email and account are not sent with that search.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Email</h2>
          <p className="mt-3">
            We use your email address to sign you in and to reply if you write to us. We don't
            send a newsletter or marketing email, and creating an account doesn't add you to a
            mailing list. If that ever changes, we'll update this policy first.
          </p>
          <p className="mt-3">
            Accounts created before November 17, 2026 were added to a mailing list run by
            Buttondown. You can unsubscribe using the link in any email from it, or ask us to
            remove you. Emails sent through Buttondown may include standard open and click
            tracking, the same as most email services use, see{" "}
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
          <p className="mt-3">
            Some links to BreakGroundU carry a short tag in the address (for example, a link a
            school counselor shares). That tag only tells us which school or source a visit came
            from, so we can report total visits back to them. It never identifies a student.
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
              <span className="font-semibold">Buttondown,</span> holds the mailing list described
              above for accounts created before November 17, 2026.
            </li>
            <li>
              <span className="font-semibold">Vercel,</span> hosts the site and provides Vercel
              Analytics.
            </li>
            <li>
              <span className="font-semibold">Google,</span> provides Google Analytics, the web
              fonts the site loads (which means your browser requests them from Google's servers,
              sharing your IP address the way any web request does) and, if you choose to use it,
              Google sign-in.
            </li>
            <li>
              <span className="font-semibold">YouTube,</span> plays the tutorial videos on software
              pages. Videos load in YouTube's privacy-enhanced mode, which doesn't store viewing
              information until you press play.
            </li>
            <li>
              <span className="font-semibold">Adzuna,</span> supplies live job listings when you
              search for openings, as described above.
            </li>
          </ul>
          <p className="mt-3">
            These services are based in the United States or operate there, and your information
            is stored and processed in the United States.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">How we protect your information</h2>
          <p className="mt-3">
            We collect as little as we need, use established providers for sign-in, hosting and
            email, keep secret keys on the server only, and limit who can see account data. No
            website can promise perfect security, but if we ever learn of a breach that affects
            your personal information, we'll notify you as required by law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Your choices and rights</h2>
          <p className="mt-3">
            We keep your account, progress, quiz-result and Action Plan data for as long as your
            account exists. You can delete a saved Action Plan yourself at any time. To get a copy
            of the data tied to your account, correct it, or delete your account entirely, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            from the address on your account. For a deletion, we'll remove your stored progress,
            quiz results and plans, remove your email from the mailing list, and delete your
            account. We aim to respond within 30 days, and we won't treat you differently for
            asking.
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
            BreakGroundU is written for high school students, career changers, and the parents,
            counselors and teachers who help them. It is not directed to children under 13, and
            you must be at least 13 to create an account. We don't knowingly collect personal
            information from children under 13. If we learn that we have, we'll delete it
            promptly. If you believe a child under 13 has created an account, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>{" "}
            and we'll remove it.
          </p>
          <p className="mt-3">
            If you're under 18, please review this policy with a parent or guardian before
            creating an account. A parent or guardian can also ask us to delete a teen's account
            and data by emailing the address above.
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
