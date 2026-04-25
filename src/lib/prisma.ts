// Singleton Prisma Client — Updated with Coupon support.
// Singleton Prisma Client — Next.js hot-reload'da bağlantı havuzunun
// patlamasını önler. Development'ta global cache, production'da fresh instance.
import "server-only";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma_v3: PrismaClient; pool: Pool };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL,
    max: 15 // Limit production connections per serverless function
  });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({ 
      connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL,
      max: 5 // Limit local connections
    });
  }
  if (!globalForPrisma.prisma_v3) {
    const adapter = new PrismaPg(globalForPrisma.pool);
    globalForPrisma.prisma_v3 = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma_v3;
}

export { prisma };
export default prisma;
