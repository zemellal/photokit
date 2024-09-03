import { z } from "zod";
import { ItemCondition } from "../types";
import { Prisma } from "@prisma/client";

export const OfferCreateSchema = z.object({
  date: z.date().optional(),
  itemCondition: z.nativeEnum(ItemCondition),
  price: z.coerce.number().positive(),
  //   priceCurrency: z.string().optional(),
  productId: z.string(),
}) satisfies z.Schema<Prisma.OfferUncheckedCreateInput>;
