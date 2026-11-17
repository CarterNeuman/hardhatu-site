import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthShell, clerkAppearance } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to save your lesson progress and Action Plan across devices.",
  robots: { index: false, follow: true },
};

// Catch-all route: Clerk uses the sub-paths (/sign-in/factor-one, etc.)
// for its multi-step flow.
export default function SignInPage() {
  return (
    <AuthShell mode="sign-in">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" appearance={clerkAppearance} />
    </AuthShell>
  );
}
