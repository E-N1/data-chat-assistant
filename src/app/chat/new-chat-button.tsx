"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createChat } from "@/lib/actions";

export default function NewChatButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const chat = await createChat({ title: "Neuer Chat" });
      router.push(`/chat/${chat.id}`);
    });
  };

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="rounded-2xl px-4 py-2 shadow border text-sm"
    >
      {pending ? "Erstelle…" : "➕ Neuer Chat"}
    </button>
  );
}