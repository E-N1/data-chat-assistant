import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Singleton-Import


export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' },
    include: { messages: true }
  });
  return NextResponse.json(chats);
}

// POST: Neuen Chat erstellen mit GPT-Titel
export async function POST(req: NextRequest) {
  try {
    // Chat direkt mit Default-Title erstellen
    const newChat = await prisma.chat.create({
      data: { title: "New chat" },
    });

    return NextResponse.json(newChat);
  } catch (error) {
    console.error("POST /api/chats error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
