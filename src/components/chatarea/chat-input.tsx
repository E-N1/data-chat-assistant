"use client";
import React, { useState } from 'react';

interface ChatInputProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (value: string) => Promise<void> | void;
}

export function ChatInput({ placeholder, buttonLabel, onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value); // <-- value wird übergeben
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-2">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border rounded-lg p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-lg">
        {buttonLabel}
      </button>
    </form>
  );
}

/**
      <Button
        variant="primary"
        size="lg"
        onClick={async () => {
          const newChat = await createChat("New Chat from HomePage");
          console.log("New chat created:", newChat);
          router.push(`/chat/${newChat.id}`);
        }}
      >
        Start a New Chat
      </Button>
 

 */