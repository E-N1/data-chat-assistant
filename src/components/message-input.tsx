"use client";
// components/MessageInput.tsx
import React, { useState } from 'react';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="flex p-4 border-gray-300" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="ml-10 px-4 py-2 bg-zinc-400 text-white rounded-md hover:bg-zinc-500"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;