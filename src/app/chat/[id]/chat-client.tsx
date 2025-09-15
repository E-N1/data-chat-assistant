"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chatarea/chat-input";

export default function ChatClient({ chat }: any) {
  const [messages, setMessages] = useState(chat.messages);

  const handleSendMessage = async (text: string) => {
    const res = await fetch(`/api/chats/${chat.id}/messages`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    setMessages((prev: any) => [
      ...prev,
      { id: data.userMessage.id, content: data.userMessage.content, role: "user" },
      { id: data.assistantMessage.id, content: data.assistantMessage.content, role: "assistant" },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="p-4 text-lg font-bold mb-4">{chat.title}</h1>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m: any) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`inline-block p-2 rounded-md ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      
      <ChatInput placeholder="Type your message..." buttonLabel="Send" onSubmit={handleSendMessage} />
    </div>
  );
}
