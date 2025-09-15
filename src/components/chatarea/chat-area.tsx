"use client";

import { useEffect, useState } from "react";
import ChatWindow from "./chat-window";

type Message = { id: string; content: string; sender: "user" | "assistant" };


// Messages and Input area
export default function ChatArea({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch(`/api/chats/${chatId}`)
      .then(res => res.json())
      .then(data =>
        setMessages(
          data.messages.map((m: any) => ({
            id: m.id,
            content: m.content,
            sender: "assistant", 
          }))
        )
      );
  }, [chatId]);

  const handleSendMessage = async (text: string) => {
    const res = await fetch(`/api/chats/${chatId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    setMessages(prev => [
      ...prev,
      { id: data.userMessage.id, content: data.userMessage.content, sender: "user" },
      { id: data.assistantMessage.id, content: data.assistantMessage.content, sender: "assistant" },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatWindow messages={messages} />
      <ChatInput placeholder="Type your message..." buttonLabel="Send" onSubmit={handleSendMessage} />
    </div>
  );
}