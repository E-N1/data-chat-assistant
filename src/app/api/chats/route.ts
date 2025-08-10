import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(chats)
}