import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(req: NextRequest) {
  try {
    console.log("Received request to create title");
    const { message } = await req.json();
    if (!message || message.trim() === "") {
      return NextResponse.json({ title: "New chat" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant who creates a very short and concise chat title from a message. Maximum 6 words.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 20,
    });

    const title = response.choices[0].message?.content?.trim() || "New chat";

    console.log("Server-side GPT title:", title);

    return NextResponse.json({ title });
  } catch (err) {
    console.error("Error creating title:", err);
    return NextResponse.json({ title: "New chatxx" });
  }
}
