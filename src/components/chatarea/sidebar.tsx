'use client';

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useChats } from "@/lib/useChats";
import { ChatItem } from "../ui/dropdown-menu";
import { GearIcon } from "@phosphor-icons/react/dist/ssr";



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
      <SidebarGroup>
          <button
              onClick={async () => {
                try {
                  const newChat = await createChat("New Chat"); // 
                  console.log("Chat erstellt:", newChat);
                  // router.push(`/chat/${newChat.id}`); // optional
                } catch (err) {
                  console.error("Fehler beim Erstellen:", err);
                }
              }}
            >
              <div className="w-full text-left p-2 rounded-sm hover:bg-blue-200">
                + New chat
              </div>
            </button>
          </SidebarGroup>

          <SidebarGroup>
            <div className="p text-gray-500 text-sm">Chats</div>

          </SidebarGroup>
      </SidebarHeader>
        <SidebarContent>

              <div className="p-2 text-sm flex flex-col gap-2">
            {chats.map((chat:any) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                //TODO: Function implementation
                onEdit={(id) => console.log("Edit", id)} 
                onDelete={(id) => console.log("Delete", id)}
              />
            ))}
          </div>
        </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t border-gray-700">
          <a href="/settings" className="block hover:underline">
            <div className="flex items-center gap-2">
              <span><GearIcon size={20} /></span>
              Settings
            </div>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}