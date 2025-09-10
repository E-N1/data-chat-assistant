'use client';

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useChats } from "@/lib/useChats";



export function AppSidebar() {
  const { chats, error, createChat } = useChats();

  if (error) return <div>Failed to load chats</div> ;
  if (!chats) return <div>Loading...</div>;

  
  return (
    <Sidebar>
      <SidebarHeader>
      <div className="p-4 font-bold text-lg">
        <Link href="/">My AI Assistant</Link>
      </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        <button
  onClick={async () => {
    try {
      const newChat = await createChat("New Chat"); // ✅ nur title
      console.log("Chat erstellt:", newChat);
      // router.push(`/chat/${newChat.id}`); // optional
    } catch (err) {
      console.error("Fehler beim Erstellen:", err);
    }
  }}
>
  <div className="w-full text-left p-2 rounded-sm hover:bg-gray-200">
    + New chat
  </div>
</button>

        </SidebarGroup>
        <div className="p-3 text-gray-500 text-sm">Chats</div>

        <div className="p-2 text-sm flex flex-col gap-2">
          {chats.map((chat: any) => (
            <div key={chat.id} className="relative group">
              {/* Chat-Button */}
              <button
                onClick={() => console.log(`Chat selected: ${chat.id}`)}
                className="w-full text-left p-2 rounded-sm hover:bg-gray-200"
              >
                {chat.title}
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                onClick={() => console.log(`Options for chat ${chat.id}`)}
              >
                ︙
              </button>
            </div>
          ))}
        </div>
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