import { z } from "zod";
import { ProductCondition } from "../types";
import { Prisma } from "@prisma/client";

export const ownershipSchema = z.object({
  productId: z.string(),
  serialNumber: z
    .string({
      invalid_type_error: "Invalid serial number format",
    })
    .min(3)
    .trim()
    .optional(),
  purchaseDate: z.date().optional(),
  itemCondition: z.nativeEnum(ProductCondition),
  price: z.coerce.number(),
}) satisfies z.Schema<Prisma.OwnershipUncheckedCreateWithoutUsersInput>;
