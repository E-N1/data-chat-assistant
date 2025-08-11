'use client';

import { v4 as uuidv4 } from 'uuid';
import useSWR  from 'swr';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook for chat logic
function useChats() {
  const { data: chats, error, mutate } = useSWR('/api/chats', fetcher);
  const today = new Date();
  const now = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  const uuid = uuidv4();

  const createChat = async () => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uuid, title: 'New Chat', createdAt: now }), 
      });
      console.log('Request body:', { id: uuid, title: 'New Chat', createdAt: now });
      if (!response.ok) throw new Error('Failed to create chat');
      const newChat = await response.json();
      mutate([...chats, newChat], false);
    } catch (err) {
      console.error(err);
    }
  };

  return { chats, error, createChat };
}

export function AppSidebar() {
  const { chats, error, createChat } = useChats();

  if (error) return <div>Failed to load chats</div>;
  if (!chats) return <div>Loading...</div>;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 font-bold text-lg">My AI Assistant</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <button
            onClick={createChat}
            className="w-full text-left p-2 hover:bg-gray-800"
          >
            + New Chat
          </button>
        </SidebarGroup>
        {chats.map((chat: any) => (
          <SidebarGroup key={chat.id}>{chat.title}</SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t border-gray-700">
          <a href="/settings" className="block hover:underline">
            ⚙ Settings
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}