// app/chat/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import ChatClient from "./chat-client";


type Message = { id: string; content: string; role: "user" | "assistant" };

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.id },
    include: { messages: true },
  });

  if (!chat) return <div>Chat not found</div>;

  // Nur Daten weitergeben
  return <ChatClient chat={chat} />;
}