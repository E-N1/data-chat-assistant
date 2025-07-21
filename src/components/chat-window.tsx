import React from 'react';

type Message = {
  sender: 'user' | 'assistant';
  text: string;
};

type ChatWindowProps = {
  messages: Message[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex-grow bg-white p-4 border-b border-gray-300 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-2 ${
            message.sender === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <span
            className={`inline-block p-2 rounded-md ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
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