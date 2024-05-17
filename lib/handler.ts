import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function handler() {
  const lenses = await client.lenses.findMany({
    include: {
      mounts: { select: { name: true } },
      brands: {
        select: {
          name: true,
        },
      },
    },
    // where: { name: { contains: "24" } },
    // orderBy: [{ mount_id: "asc" }, { min_fl: "asc" }],
  });

  return { lenses };
}
