import "server-only";
import { PrismaClient } from "@prisma/client";
// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";

// Nodejs runtime
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// For the edge
// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
// export const prisma = new PrismaClient({ adapter });
