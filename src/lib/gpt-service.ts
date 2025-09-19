// lib/openai.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("Missing OPENAI_API_KEY in environment variables");

const client = new OpenAI({ apiKey });

/**
 * Generates a short chat title (max. 4 words) from a user message.
 */
export async function generateChatTitle(message: string): Promise<string> {
  if (!message.trim()) return "New chat";

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Create a very short chat title (max 4 words)." },
      { role: "user", content: message },
    ],
    max_tokens: 20,
  });

  // Only take the first 4 words of the response
  const title = response.choices[0].message?.content?.trim().split(/\s+/).slice(0, 4).join(" ") || "New chat";
  return title;
}

/**
 * Generates a GPT response to a user message
 */
export async function generateGPTResponse(message: string): Promise<string> {
  if (!message.trim()) return "Sorry, I couldn't answer.";

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      { role: "user", content: message },
      { role: "system", content: "You are a helpful assistant." }
      
    ],
  });

  return response.choices[0].message?.content?.trim() || "Sorry, I couldn't answer.";
}

/**
 * TODO, later: Generate GPT embeddings 
 */
export async function generateEmbedding(text: string) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });
  return response.data[0].embedding;
}

export { client };
