import { Prisma } from "@prisma/client";
import { z } from "zod";

export const KitCreateSchema = z.object({
  name: z.string().min(3).trim(),
}) satisfies z.Schema<Prisma.KitUncheckedCreateWithoutOwnerInput>;

export const ProductsOnKitsSchema = z.object({
  kitId: z.string(),
  productId: z.string(),
}) satisfies z.Schema<Prisma.ProductsOnKitsUncheckedCreateInput>;
