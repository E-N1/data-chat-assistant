import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatWindow from "@/components/chat-window";
import MessageInput from "@/components/message-input";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const messages = [
  { sender: "assistant", text: "Test: DB ENTRIES COMING SOON" },
  { sender: "assistant", text: "Hello, how can I help you?" },
  { sender: "user", text: "What is my tax number? Can you crawl my data?" },
  { sender: "assistant", text: "12121221/121212/232332" },
  { sender: "user", text: "Wow! so easy. Thank you" },
];

export const metadata: Metadata = {
  title: "AI Knowledge Assistant",
  description: "Your personal AI knowledge assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <SidebarProvider>
          <AppSidebar />

          <div className="flex-1 flex flex-col">
            <SidebarTrigger />
            <main className="p-6">{children}
              <ChatWindow messages = {messages} ></ChatWindow></main> 
          </div>
{/* 
            <MessageInput onSendMessage={(message) => {
              console.log("Send message:", message);
            }} /> */}

        </SidebarProvider>
      </body>
    </html>
  );
}



