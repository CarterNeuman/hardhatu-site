"use client";

import { cloneElement, useEffect, useRef, useState, type ReactElement, type MouseEvent } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { SignInOptions } from "@/components/SignInOptions";
import { clerkAppearance as fillColumn } from "@/components/AuthShell";

// The site's own sign-in pop-up: Clerk's form plus the class code and
// school panels, the same layout as /sign-in, so readers sign in without
// leaving the page they're on. Clerk's built-in pop-up can't hold extra
// content, so this wraps Clerk's <SignIn> in a native <dialog> instead
// (which handles focus trapping, Esc to close, and returning focus to the
// button that opened it). Hash routing keeps Clerk's multi-step flow
// (verify email, etc.) on this page, in the URL hash.
//
// Usage: wrap a button, same as Clerk's <SignInButton>:
//   <SignInDialogButton><button type="button">Sign In</button></SignInDialogButton>

type ClickableChild = ReactElement<{ onClick?: (e: MouseEvent<HTMLElement>) => void }>;

export function SignInDialogButton({ children }: { children: ClickableChild }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [returnTo, setReturnTo] = useState("/");
  const { isSignedIn } = useUser();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Signed in (email code finishes in place): close and stay on the page.
  useEffect(() => {
    if (isSignedIn) setOpen(false);
  }, [isSignedIn]);

  const trigger = cloneElement(children, {
    onClick: (e: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(e);
      setReturnTo(window.location.href);
      setOpen(true);
    },
  });

  return (
    <>
      {trigger}
      <dialog
        ref={dialogRef}
        aria-label="Sign in"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // A click on the dimmed backdrop (the dialog element itself, not
          // its contents) closes it.
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="m-auto max-h-[92vh] w-[min(64rem,calc(100vw-2rem))] overflow-y-auto border border-hairline bg-paper p-0 text-ink backdrop:bg-ink/60"
      >
        {open && (
          <div className="relative p-5 sm:p-7">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sign in"
              className="absolute right-3 top-3 px-2 py-1 text-xl leading-none text-steel hover:text-ink"
            >
              ×
            </button>
            <p className="pr-8 font-display text-3xl font-bold text-ink">Sign in</p>
            <p className="mt-1 text-sm text-steel">
              Save your progress across devices. You&rsquo;ll stay right on this page.
            </p>
            <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
              <SignIn
                routing="hash"
                withSignUp
                forceRedirectUrl={returnTo}
                signUpForceRedirectUrl={returnTo}
                appearance={fillColumn}
              />
              <SignInOptions />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
