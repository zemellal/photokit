import { z } from "zod";
import { LensType, ProductType } from "../types";
import { Prisma } from "@prisma/client";

const lensSchema = z.object({
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
}) satisfies z.Schema<Prisma.LensUncheckedCreateWithoutProductsInput>;

const cameraSchema = z.object({
  mountId: z.number(),
  megapixels: z.coerce.number().positive().optional(),
  cropFactor: z.coerce.number().positive().optional(),
}) satisfies z.Schema<Prisma.CameraUncheckedCreateWithoutProductsInput>;

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
  name: z.string({ required_error: "Please name your item" }),
  type: z.nativeEnum(ProductType),
  brandId: z.number({ required_error: "Brand is required for product" }),
  price: z.coerce.number().optional(),
  weight: z.coerce.number().positive().int().optional(),
  releaseDate: z.date().optional(),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;

export const ProductCreateInputSchema = z.intersection(
  schemaConditions,
  productBaseSchema
);
