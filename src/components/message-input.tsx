"use client";
// components/MessageInput.tsx
import React, { useState } from 'react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Senden
      </button>
    </form>
  );
}