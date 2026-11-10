import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getActiveUserCount, getCompletionCounts, getQuizResultCounts } from "@/lib/db";

// Internal-only dashboard, not linked from anywhere on the site. Gated to
// a single admin email (ADMIN_EMAIL in .env.local / Vercel env vars), not
// a real roles system -- there's one operator, this is deliberately the
// simplest thing that works, revisit if that ever changes.
//
// Always fetches fresh (no static caching): this is a live operational
// view, not content.
export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!adminEmail || !email || email !== adminEmail) {
    redirect("/");
  }

  const [activeUsers, completions, quizCounts] = await Promise.all([
    getActiveUserCount(),
    getCompletionCounts(),
    getQuizResultCounts(),
  ]);

  const totalQuizAttempts = quizCounts.reduce((sum, row) => sum + row.count, 0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-ink">Analytics</h1>
      <p className="mt-2 text-steel">
        Internal only. Aggregate engagement data from signed-in accounts, not raw traffic (see GA4/Vercel
        Analytics for that).
      </p>

      <section className="mt-10 border border-hairline bg-amber-soft px-6 py-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-steel">
          Signed-in users with any activity
        </p>
        <p className="mt-1 font-display text-4xl font-bold text-ink">{activeUsers}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Most-completed content</h2>
        <p className="mt-1 text-sm text-steel">
          Distinct users who marked each item done. This is the "actually used," not "viewed," number.
        </p>
        <table className="mt-4 w-full border border-hairline text-left text-sm">
          <thead>
            <tr className="border-b border-hairline bg-paper">
              <th className="px-3 py-2 font-semibold text-ink">Type</th>
              <th className="px-3 py-2 font-semibold text-ink">Content ID</th>
              <th className="px-3 py-2 font-semibold text-ink">Completions</th>
            </tr>
          </thead>
          <tbody>
            {completions.map((row) => (
              <tr key={`${row.contentType}-${row.contentId}`} className="border-b border-hairline">
                <td className="px-3 py-2 text-steel">{row.contentType}</td>
                <td className="px-3 py-2 text-ink">{row.contentId}</td>
                <td className="px-3 py-2 font-semibold text-navy">{row.count}</td>
              </tr>
            ))}
            {completions.length === 0 && (
              <tr>
                <td className="px-3 py-3 text-steel" colSpan={3}>
                  No completions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Career quiz results, by category</h2>
        <p className="mt-1 text-sm text-steel">
          {totalQuizAttempts} saved attempt{totalQuizAttempts === 1 ? "" : "s"} from signed-in users (quiz
          takers who weren't signed in aren't captured here).
        </p>
        <table className="mt-4 w-full border border-hairline text-left text-sm">
          <thead>
            <tr className="border-b border-hairline bg-paper">
              <th className="px-3 py-2 font-semibold text-ink">Category</th>
              <th className="px-3 py-2 font-semibold text-ink">Times matched</th>
            </tr>
          </thead>
          <tbody>
            {quizCounts.map((row) => (
              <tr key={row.resultCategory} className="border-b border-hairline">
                <td className="px-3 py-2 text-ink">{row.resultCategory}</td>
                <td className="px-3 py-2 font-semibold text-navy">{row.count}</td>
              </tr>
            ))}
            {quizCounts.length === 0 && (
              <tr>
                <td className="px-3 py-3 text-steel" colSpan={2}>
                  No quiz results saved yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
