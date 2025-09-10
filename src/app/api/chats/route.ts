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
    const { id, title, createdAt } = body;

    if (!id || !title || !createdAt) {
      return new Response(
        JSON.stringify({ error: "id, title und createdAt sind erforderlich" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const chat = await prisma.chat.create({
      data: {
        id,
        title,
        createdAt: new Date(createdAt),
      },
    });

    return new Response(JSON.stringify(chat), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fehler beim Erstellen eines neuen Chats:", error);

    return new Response(
      JSON.stringify({ error: "Serverfehler beim Erstellen eines Chats" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title } = body;

    const chat = await prisma.chat.update({
      where: { id: params.id },
      data: { title }, // updated_at wird automatisch durch Trigger gesetzt
    });

    return new Response(JSON.stringify(chat), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fehler beim Updaten:", error);
    return new Response(JSON.stringify({ error: "Update fehlgeschlagen" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}