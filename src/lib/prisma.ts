// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// For Hot Reload(Development Mode)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], 
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
