// app/chat/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import ChatClient from "./chat-client";
  await new Promise(res => setTimeout(res, 1500)); 


export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  });

  if (!chat) return <div>Chat not found</div>;
  console.log("Chat found:", chat);
  // Only Data fetching on server, rest is client-side
  return <ChatClient chat={chat} />;
}