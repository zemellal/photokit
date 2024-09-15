import { z } from "zod";
import { LensType, ProductType } from "../types";
import { Prisma, Product } from "@prisma/client";

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

// is this too specific: cuid ?
export const productIdSchema = z.string().cuid() satisfies z.Schema<
  Product["id"]
>;
