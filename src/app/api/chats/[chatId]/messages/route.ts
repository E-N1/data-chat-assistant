// /api/chats/[chatId]/messages/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateGPTResponse } from "@/lib/gpt-service";

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { text } = await req.json();
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // 1. User-Message speichern
    const userMessage = await prisma.message.create({
      data: {
        content: text,
        role: "user",
        chat: { connect: { id: params.chatId } },
      },
    });

    // 2. GPT-Antwort generieren (hier kannst du deine Funktion nutzen)
    // z.B. generateGPTResponse(text)
    const gptResponse = await generateGPTResponse(text);

    // 3. Assistant-Message speichern
    const assistantMessage = await prisma.message.create({
      data: {
        content: gptResponse,
        role: "assistant",
        chat: { connect: { id: params.chatId } },
      },
    });

    return NextResponse.json({ userMessage, assistantMessage });
  } catch (error) {
    console.error("Error in /messages:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
