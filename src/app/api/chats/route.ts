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
    
    const { message } = body;

    
    const chat = await prisma.chat.create({
      data: {
        title: message.slice(0, 30), // first 30 characters as title
        messages: {
          create: {
            role: "user",
            content: message,
          },
        },
      },
      include: { messages: true },
    });
  



    return new Response(JSON.stringify(chat), {
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