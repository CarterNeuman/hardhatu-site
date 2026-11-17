import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthShell, clerkAppearance } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free account to save your lesson progress and Action Plan across devices.",
  robots: { index: false, follow: true },
};

// Catch-all route: Clerk uses the sub-paths (/sign-up/verify-email-address,
// etc.) for its multi-step flow.
export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" appearance={clerkAppearance} />
    </AuthShell>
  );
}
