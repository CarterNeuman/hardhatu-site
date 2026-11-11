import type { Metadata } from "next";
import { getAllContent, groupInterviewsByCategory, slugifyCategory } from "@/lib/content";
import { CategorySection } from "@/components/CategorySection";
import { ContentCard } from "@/components/ContentCard";
import { InterviewClipboardHeader } from "@/components/InterviewClipboardHeader";
import { CATEGORY_SLUG } from "@/lib/content-client";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "General interview basics plus a detailed guide for every construction career category: what recruiters actually ask and how to answer.",
};

// A couple of guides lead their `questions` array with a framing sentence
// rather than an actual quoted question (e.g. the general guide's intro).
// Those run 200+ characters and would overflow the clipboard even at the
// widened size, so they're filtered out of the rotating sample — the
// clipboard is for a quick, real quoted question, not guide copy.
const MAX_SAMPLE_LENGTH = 180;

export default function InterviewsIndexPage() {
  const { interviews } = getAllContent();
  const groups = groupInterviewsByCategory(interviews);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">Interview Prep</h1>
      <p className="mt-3 max-w-2xl text-steel">
        {interviews.length} guides: general basics for any construction interview, plus a
        detailed guide for every career category covering the specific roles inside it.
      </p>

      {groups.map((group) => {
        const allFirstQuestions = group.items
          .flatMap((interview) => interview.questions.slice(0, 1).map((q) => q.question))
          .filter((q, i, arr) => arr.indexOf(q) === i);
        const questions = (
          allFirstQuestions.filter((q) => q.length <= MAX_SAMPLE_LENGTH).length > 0
            ? allFirstQuestions.filter((q) => q.length <= MAX_SAMPLE_LENGTH)
            : allFirstQuestions
        ).slice(0, 4);

        return (
          <CategorySection
            key={group.category}
            id={CATEGORY_SLUG[group.category] ?? slugifyCategory(group.category)}
            title={group.category}
            count={group.items.length}
            headerRight={<InterviewClipboardHeader questions={questions} />}
          >
            {group.items.map((interview) => (
              <ContentCard key={interview.id} item={interview} description={interview.tagline} />
            ))}
          </CategorySection>
        );
      })}
    </div>
  );
}
