"use client";
import { useActionState } from "react";
import { addMessage } from "@/lib/actions";

export default function MessageComposer({ chatId }: { chatId: string }) {
  const [state, formAction, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const content = String(formData.get("content") || "").trim();
    if (!content) return { error: "Bitte Nachricht eingeben." };

    await addMessage({ chatId, role: "user", content });
    return { ok: true };
  }, null);

  return (
    <form action={formAction} className="flex gap-2">
      <input
        name="content"
        placeholder="Nachricht schreiben…"
        className="flex-1 rounded-xl border px-3 py-2"
      />
      <button disabled={pending} className="rounded-xl border px-4 py-2">
        {pending ? "Sende…" : "Senden"}
      </button>
      {state?.error && <span className="text-red-600 text-sm">{state.error}</span>}
    </form>
  );
}