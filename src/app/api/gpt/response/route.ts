// app/api/gpt/response/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateGPTResponse } from "@/lib/gpt-service";

// POST: GPT-Antwort generieren
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "Message is empty" }, { status: 400 });
    }

    const text = await generateGPTResponse(message);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("POST /api/gpt/response error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
