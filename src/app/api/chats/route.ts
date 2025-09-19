// api/chats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { createdAt: "desc" },
    include: { messages: true },
  });
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const { title, message } = await req.json();
  const newChat = await prisma.chat.create({
    data: {
      title,
      messages: message
        ? {
            create: { content: message, role: "user" },
          }
        : undefined,
    },
    include: { messages: true },
  });
  return NextResponse.json(newChat);
}
