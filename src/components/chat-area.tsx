"use client";

import { useState } from "react";
import ChatWindow from "./chat-window";
import MessageInput from "./chat-input";

const messages = [
  { sender: "assistant", text: "Test: DB ENTRIES COMING SOON" },
  { sender: "assistant", text: "Hello, how can I help you?" },
  { sender: "user", text: "What is my tax number? Can you crawl my data?" },
  { sender: "assistant", text: "12121221/121212/232332" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "assistant", text: "TEST" },
  { sender: "user", text: "Wow! so easy. Thank you" },
];

export default function ChatArea() {
  //const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  /* coming soon, with backend integration
  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
  };
  */

  return (
    <div className="flex flex-col">
      <ChatWindow messages={messages} />
        <MessageInput onSendMessage={messages} />
    </div>
  );
}
