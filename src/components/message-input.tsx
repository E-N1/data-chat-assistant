"use client";

import { ChatInput } from "@/components/chat-input";
import React from "react";

interface MessageInputProps {
  chatId: string;
  onSendMessage: (chatId: string, text: string) => Promise<void>;
}

export function MessageInput({ chatId, onSendMessage }: MessageInputProps) {
  const handleSend = async (text: string) => {
    await onSendMessage(chatId, text);
  };

  return (
    <ChatInput
      placeholder="Type your message..."
      buttonLabel="Send"
      onSubmit={handleSend}
    />
  );
}