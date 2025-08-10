'use client'

import useSWR from 'swr'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from "@/components/ui/sidebar"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function AppSidebar() {
  const { data: chats, error } = useSWR('/api/chats', fetcher)

  if (error) return <div>Failed to load chats</div>
  if (!chats) return <div>Loading...</div>

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 font-bold text-lg">My AI Assistant</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <button className="w-full text-left p-2 hover:bg-gray-800">+ New Chat</button>
        </SidebarGroup>
        {chats.map((chat: any) => (
          <SidebarGroup key={chat.id}>
            {chat.title}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t border-gray-700">
          <a href="/settings" className="block hover:underline">⚙ Settings</a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
