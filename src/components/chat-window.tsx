"use client";
import React from 'react';
import MessageInput from './message-input';

type Message = {
  sender: 'user' | 'assistant';
  text: string;
};

type ChatWindowProps = {
  messages: Message[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`inline-block p-2 rounded-md ${
              message.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {message.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;