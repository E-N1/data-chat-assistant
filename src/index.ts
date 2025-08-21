import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const answer = completion.choices[0].message.content;

  await prisma.prompt.create({
    data: { question: prompt, answer },
  });

  console.log('Antwort:', answer);
}

run('Was ist der Sinn von pgvector?');
