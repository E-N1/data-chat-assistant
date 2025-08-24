import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Singleton-Import

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newChat = await prisma.chat.create({
      data: {
        title: body.title || 'New Chat',
      },
    });

    return new Response(JSON.stringify(newChat), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fehler beim Erstellen eines neuen Chats:', error);

    return new Response(
      JSON.stringify({ error: 'Invalid request body or server error' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}