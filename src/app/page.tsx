"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageInput from "@/components/message-input";

export default function HomePage() {
  const router = useRouter();

  async function handleSend(text: string) {
    // neuen Chat in DB erstellen
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const chat = await res.json();
    router.push(`/chat/${chat.id}`);
  }


  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Let´s create something big!</h1>

      <MessageInput onSend={handleSend} />
    </main>
  );
}
