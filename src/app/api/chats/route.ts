import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(chats)
}

export async function POST(req: Request) {
  try {
    // Überprüfe, ob ein Body vorhanden ist
    const body = await req.json();

    // Erstelle einen neuen Chat
    const newChat = await prisma.chat.create({
      data: {
        
        title: body.title || "New Chat", // Standardtitel, falls keiner angegeben ist
      },
    });

    return new Response(JSON.stringify(newChat), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fehler beim Erstellen eines neuen Chats:", error);

    return new Response(
      JSON.stringify({ error: "Invalid request body or server error" }),
      {
        status: 400, // Bad Request
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}