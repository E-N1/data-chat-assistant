import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  

  
  export function AppSidebar() {
    return (
        <Sidebar>
            <div className="flex items-center justify-center h-16 bg-neutral-900 text-white">
                <h1 className="text-lg font-bold">Knowledge Assistant</h1>
                </div>
          <SidebarHeader>
            <div className="p-4 font-bold text-lg">My AI Assistant</div>
          </SidebarHeader>
    
          <SidebarContent>
            <SidebarGroup>
              <button className="w-full text-left p-2 hover:bg-gray-800">+ New Chat</button>
            </SidebarGroup>
    
            <SidebarGroup>
              <div className="p-2 text-gray-400 uppercase text-xs">Recent Chats</div>
              <a href="/chat/1" className="block p-2 hover:bg-gray-800">Project Plan</a>
              <a href="/chat/2" className="block p-2 hover:bg-gray-800">Meeting Notes</a>
            </SidebarGroup>
          </SidebarContent>
    
          <SidebarFooter>
            <div className="p-4 border-t border-gray-700">
              <a href="/settings" className="block hover:underline">⚙ Settings</a>
            </div>
          </SidebarFooter>
        </Sidebar>
      )
    }
