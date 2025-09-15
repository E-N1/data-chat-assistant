import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateGPTResponse, generateChatTitle } from "@/lib/gpt-service";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) return NextResponse.json({ error: "Message is empty" }, { status: 400 });
    // save message 
    const message = await prisma.message.create({
      data: {
        chatId: await params.id,
        content: text,
      },
    });

    // gpt reply
    const gptReply = await generateGPTResponse(text);

    await prisma.message.create({
      data: {
        chatId: params.id,
        content: gptReply,
      },
    });

    // gpt title update if default title
    const chat = await prisma.chat.findUnique({ where: { id: params.id } });
    if (chat?.title === "New chat") {
      const newTitle = await generateChatTitle(text);
      await prisma.chat.update({
        where: { id: params.id },
        data: { title: newTitle },
      });
    }

    return NextResponse.json({ userMessage: text, assistantMessage: gptReply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
