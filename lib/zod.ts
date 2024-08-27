import { object, string, z } from "zod";
import { ProductCondition } from "./types";
import { Prisma } from "@prisma/client";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .toLowerCase(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

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
