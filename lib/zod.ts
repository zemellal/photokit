import { object, string, z } from "zod";
import { Prisma, Product } from "@prisma/client";

import { ItemCondition, LensType, ProductType } from "./types";

/**
 * Shared Schemas
 *
 */

const priceSchema = z.coerce.number().positive("Must be positive").safe();
const itemCondition = z.nativeEnum(ItemCondition);

/**
 * Product Schemas
 */

const lensSchema = z
  .object({
    mountId: z.number(),
    type: z.nativeEnum(LensType),
    minFl: z.coerce
      .number({ required_error: "Focal length is required" })
      .positive(),
    maxAperture: z.coerce
      .number({
        required_error: "Maximum aperture is required",
      })
      .positive(),
    maxFl: z.optional(z.coerce.number().positive()),
    filterThread: z.optional(z.coerce.number().positive()),
  })
  .superRefine((obj, ctx) => {
    // check max focal length is filled in for zoom lens type
    if (obj.type === "zoom" && (!obj.maxFl || typeof obj.maxFl !== "number")) {
      ctx.addIssue({
        path: ["maxFl"],
        code: z.ZodIssueCode.custom,
        message: "Zoom lenses require a maximum focal length",
      });
    }
    // check that max focal length is greater than min focal length
    if (obj.maxFl && obj.maxFl <= obj.minFl) {
      ctx.addIssue({
        path: ["maxFl"],
        code: z.ZodIssueCode.custom,
        message: "Max focal length needs to be greater than min focal length",
      });
    }
  }) satisfies z.Schema<Prisma.LensUncheckedCreateWithoutProductInput>;

const cameraSchema = z.object({
  mountId: z.number(),
  megapixels: z.coerce.number().positive().optional(),
  cropFactor: z.coerce.number().positive().optional(),
}) satisfies z.Schema<Prisma.CameraUncheckedCreateWithoutProductInput>;

const lensProductSchema = z.object({
  type: z.literal(ProductType.lens),
  lensData: lensSchema,
});
const cameraProductSchema = z.object({
  type: z.literal(ProductType.camera),
  cameraData: cameraSchema,
});
const accessoryProductSchema = z.object({
  type: z.literal(ProductType.accessory),
});

const schemaConditions = z.discriminatedUnion("type", [
  lensProductSchema,
  cameraProductSchema,
  accessoryProductSchema,
]);

const productBaseSchema = z.object({
  name: z.string({ required_error: "Product name is required" }),
  type: z.nativeEnum(ProductType),
  brandId: z.number({ required_error: "Brand is required for product" }),
  price: priceSchema.optional(),
  weight: z.coerce.number().positive().int().optional(),
  releaseDate: z.date().optional(),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;

export const ProductCreateInputSchema = z.intersection(
  schemaConditions,
  productBaseSchema
);

export const ProductIdSchema = z.string() satisfies z.Schema<Product["id"]>;

/**
 * Ownership Schemas
 */

export const OwnershipSchema = z.object({
  productId: z.string(),
  serialNumber: z
    .string({
      invalid_type_error: "Invalid serial number format",
    })
    .min(3)
    .trim()
    .optional(),
  purchaseDate: z.date().optional(),
  itemCondition: itemCondition,
  price: priceSchema,
}) satisfies z.Schema<Prisma.OwnershipUncheckedCreateWithoutUserInput>;

/**
 * Kit Schemas
 * */

export const KitCreateSchema = z.object({
  name: z.string().min(3).trim(),
}) satisfies z.Schema<Prisma.KitUncheckedCreateWithoutOwnerInput>;

export const ProductsOnKitsSchema = z.object({
  kitId: z.string(),
  productId: z.string(),
}) satisfies z.Schema<Prisma.ProductsOnKitsUncheckedCreateInput>;

/**
 * Offer Schemas
 * */

export const OfferCreateSchema = z.object({
  date: z.date().optional(),
  itemCondition: itemCondition,
  price: priceSchema,
  //   priceCurrency: z.string().optional(),
  productId: z.string(),
}) satisfies z.Schema<Prisma.OfferUncheckedCreateInput>;

/**
 * User Schemas
 * */

export const UserProfileSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
}) satisfies z.Schema<Prisma.UserUpdateInput>;

/**
 * Auth Schemas
 * */

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
