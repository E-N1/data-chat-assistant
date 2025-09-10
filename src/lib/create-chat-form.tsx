"use client";
import { useChats } from "@/lib/useChats";
import { useRouter } from "next/navigation";
import { ChatInput } from "@/components/chat-input";

export function CreateChatForm() {
  const { createChat } = useChats();
  const router = useRouter();

  const handleCreate = async (message: string) => {
    if (!message || !message.trim()) {
      console.warn("No message provided, aborting create");
      return;
    }
  
    try {
      const res = await fetch("/api/create-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error("API returned error:", text);
        return;
      }
  
      const data = await res.json();
      const title = data.title;
      console.log("Generated GPT Title (client-side):", title);
  
      const newChat = await createChat(title, message);
      console.log("New chat created:", newChat);
  
      router.push(`/chat/${newChat.id}`);
    } catch (err) {
      console.error("Error in handleCreate:", err);
    }
  };

  return (
    <ChatInput
      placeholder="Ask me something to start..."
      buttonLabel="Create Chat"
      onSubmit={handleCreate}
    />
  );
}

