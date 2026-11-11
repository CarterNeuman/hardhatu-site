"use client";

// A small delete action for one row on the "your saved plans" list
// (app/action-plan/my-plans/page.tsx). Confirms first since this is
// permanent (no undo, no trash), then calls DELETE /api/action-plans
// and asks the server component to refetch rather than managing a
// duplicate copy of the list's state here.
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeletePlanButton({
  category,
  careerId,
  label,
}: {
  category: string;
  careerId: string;
  // Human-readable name for the confirm dialog, e.g. "Electrician" or
  // "Field & Trades (general)".
  label: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (pending) return;
    const confirmed = window.confirm(`Delete your ${label} plan? This can't be undone.`);
    if (!confirmed) return;

    setPending(true);
    try {
      const res = await fetch("/api/action-plans", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, careerId }),
      });
      if (!res.ok) throw new Error("delete failed");
      router.refresh();
    } catch {
      window.alert("Something went wrong deleting that plan. Try again in a moment.");
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-xs font-semibold text-clay transition-colors hover:underline disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
