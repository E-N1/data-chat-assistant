"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createChat({
  title = "Neuer Chat",
  userId,
  systemPrompt,
}: { title?: string; userId?: string; systemPrompt?: string }) {
  const chat = await prisma.chat.create({
    data: {
      title,
      userId,
      messages: systemPrompt
        ? {
            create: {
              role: "system",
              content: systemPrompt,
            },
          }
        : undefined,
    },
    include: { messages: true },
  });

  // Revalidate the chat list page (root in this example)
  revalidatePath("/");
  return chat;
}

export async function addMessage({
  chatId,
  role,
  content,
}: { chatId: string; role: "user" | "assistant" | "system"; content: string }) {
  const msg = await prisma.message.create({
    data: { chatId, role, content },
  });

  // Revalidate the chat detail route
  revalidatePath(`/chat/${chatId}`);
  return msg;
}

export async function getChats(userId?: string) {
  return prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });
}

export async function getChat(chatId: string) {
  return prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
}