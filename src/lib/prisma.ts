// Singleton Prisma Client — Updated with Coupon support.
// Singleton Prisma Client — Next.js hot-reload'da bağlantı havuzunun
// patlamasını önler. Development'ta global cache, production'da fresh instance.
import "server-only";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma_v3: PrismaClient };

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma_v3 ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma_v3 = prisma;

export default prisma;
