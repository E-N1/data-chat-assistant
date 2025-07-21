import React from 'react';

type ChatSidebarProps = {
  chats: { id: number; title: string }[];
  onSelectChat: (id: number) => void;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
      <h3 className="font-bold mb-4">Past Chats</h3>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="cursor-pointer mb-2 p-2 hover:bg-gray-300"
          onClick={() => onSelectChat(chat.id)}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;