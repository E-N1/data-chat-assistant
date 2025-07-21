import React, { useState } from 'react';
import ChatSidebar from '../../components/chat-sidebar';
import ChatWindow from '../../components/chat-window';
import MessageInput from '../../components/message-input';

const Home: React.FC = () => {
  const [chats, setChats] = useState([{ id: 1, title: 'Chat with AI Assistant' }]);
  const [selectedChat, setSelectedChat] = useState(chats[0].id);
  const [messages, setMessages] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([]);

  const handleSendMessage = (message: string) => {
    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);
    // Füge hier Logik hinzu, um Nachricht an Backend zu senden
  };

  return (
    <div className="h-screen flex">
      <ChatSidebar chats={chats} onSelectChat={setSelectedChat} />
      <div className="flex flex-col flex-grow">
        <ChatWindow messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Home;