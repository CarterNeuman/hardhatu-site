import Link from "next/link";
import { SignInOptions } from "@/components/SignInOptions";

// Shared layout for /sign-in and /sign-up: Clerk's form on the left, the
// class code and school options on the right (stacked below on phones).

// The site-wide Clerk look lives on <ClerkProvider> (lib/clerk-appearance.ts).
// Here the form only needs to fill its column.
export const clerkAppearance = {
  elements: {
    rootBox: { width: "100%" },
    cardBox: { width: "100%", maxWidth: "none" },
  },
};

export function AuthShell({ mode, children }: { mode: "sign-in" | "sign-up"; children: React.ReactNode }) {
  const signIn = mode === "sign-in";
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-14">
      <h1 className="font-display text-4xl font-bold text-ink">{signIn ? "Sign in" : "Create your account"}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-steel">
        Save your lesson progress and Action Plan across devices. Browsing the site never requires an account.
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-8">
        <div className="w-full">{children}</div>
        <SignInOptions />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-steel">
        By creating an account you agree to the{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-navy">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-navy">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
