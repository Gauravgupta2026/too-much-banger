"use client";

import { useState, useTransition } from "react";

type InterestFormProps = {
  attendeeStatus: "was-there" | "watching-chaos" | null;
};

export function InterestForm({ attendeeStatus }: InterestFormProps) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function submit(formData: FormData) {
    setStatus("idle");

    startTransition(async () => {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          note: formData.get("note"),
          attendeeStatus
        })
      }).catch(() => null);

      setStatus(response?.ok ? "sent" : "error");
    });
  }

  return (
    <form className="interest-form" action={submit}>
      <label>
        Name
        <input name="name" required placeholder="Your party name" />
      </label>
      <label>
        Email or X handle
        <input name="contact" required placeholder="@handle or you@example.com" />
      </label>
      <label className="wide">
        Optional note
        <textarea name="note" placeholder="Why should the bouncer algorithm let you in?" rows={4} />
      </label>
      <button className="primary-button wide" type="submit" disabled={isPending}>
        {isPending ? "Sending to the group chat..." : "Tell the team I want in"}
      </button>
      {status === "sent" ? <p className="form-note wide">Logged. The clipboard has noticed you.</p> : null}
      {status === "error" ? (
        <p className="form-note wide">Submissions need Supabase env vars before this can persist.</p>
      ) : null}
    </form>
  );
}
