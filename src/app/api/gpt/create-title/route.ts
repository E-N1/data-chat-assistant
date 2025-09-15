import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { generateGPTResponse } from "@/lib/gpt-service";

const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || message.trim() === "") {
      return NextResponse.json({ title: "New chat" });
    }
    
    const title = await generateGPTResponse(message);

    return NextResponse.json({ title });
  } catch (err) {
    console.error("Error creating title:", err);
    return NextResponse.json({ title: "New chat" });
  }
}
