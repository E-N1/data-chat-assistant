"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chatarea/chat-input";
import { useSidebar } from "@/components/ui/sidebar";

export default function ChatClient({ chat }: any) {
  const [messages, setMessages] = useState(chat.messages);
  const { state, isMobile, openMobile } = useSidebar();

  const sidebarWidthDesktop = 10; // gleiche Maße wie --sidebar-width

  const handleSendMessage = async (text: string) => {
    const res = await fetch(`/api/chats/${chat.id}/messages`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    console.log("Response from sending message:", res);
    if (!res.ok) {
      console.error("Failed to send message");
      return;
    }
    
    const data = await res.json();
    setMessages((prev: any) => [
      ...prev,
      { id: data.userMessage.id, content: data.userMessage.content, role: "user" },
      { id: data.assistantMessage.id, content: data.assistantMessage.content, role: "assistant" },
    ]);
  };

  const marginLeft =
    isMobile ? 0 : state === "collapsed" ? 60 : sidebarWidthDesktop;

  return (
    <div className="flex flex-col relative pb-35" style={{ marginLeft }}>
      <div className="flex-1 overflow-y-auto px-10 py-5 space-y-2">
        {messages.map((m: any) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`inline-block p-3 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <ChatInput placeholder="Type your message..." buttonLabel="Send" onSubmit={handleSendMessage} />
      </div>
    </div>
  );
}