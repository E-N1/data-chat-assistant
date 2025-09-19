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
import { ChatItem } from "../ui/dropdown-menu";
import { SettingsMenu } from "../settings-menu/settings";
import { useRouter } from "next/navigation";




export function AppSidebar() {
  const { chats, error, createChat } = useChats();
  const router = useRouter(); 

  if (error) return <div>Failed to load chats</div> ;
  if (!chats) return <div>No chats found in database</div> ;
  
  return (
    <Sidebar>
      <SidebarHeader>
      <div className="p-4 font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  ">
  <Link href="/">Local Assistant</Link>
</div>
      {/* new chat button */}
      <SidebarGroup>
          <button
            onClick={async () => {
              try {
                const newChat = await createChat("New Chat"); 
                console.log("Chat created:", newChat);
                router.push(`/chat/${newChat.id}`); // ✅ Navigation nach Chat
              } catch (err) {
                console.error("Error creating chat:", err);
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
          {/* chat-hover functions */}
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
            <div className="pt-3 border-t border-gray-700">

              <SettingsMenu />

            </div>
        </SidebarFooter>
    </Sidebar>
  );
}