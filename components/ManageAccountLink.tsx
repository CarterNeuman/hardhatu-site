"use client";

// A plain text link that opens Clerk's own account-management modal
// (email, password, sessions) -- used on My Progress's account-info
// strip so there's a way back to those settings without Clerk's
// UserButton dropdown being the only entry point. Deliberately not a
// second "account settings" page of our own: Clerk already handles
// this well, no reason to rebuild it.
import { useClerk } from "@clerk/nextjs";

export function ManageAccountLink() {
  const { openUserProfile } = useClerk();
  return (
    <button
      type="button"
      onClick={() => openUserProfile()}
      className="text-xs font-semibold text-steel underline-offset-2 hover:text-ink hover:underline"
    >
      Manage account
    </button>
  );
}
