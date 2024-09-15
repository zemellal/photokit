"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createOffer } from "@/data/offers";
import { createProduct } from "@/data/products";
import { OfferCreateSchema, ProductCreateInputSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";

export const createProductAction = async (
  data: Prisma.ProductUncheckedCreateInput
) => {
  const validData = ProductCreateInputSchema.parse(data);
  const product = await createProduct(validData);

  revalidatePath("/browse", "page");
  redirect("/browse");
  // return product;
};

export const createOfferAction = async (
  data: Prisma.OfferUncheckedCreateInput
) => {
  const validData = OfferCreateSchema.parse(data);
  const offer = await createOffer(validData);

  revalidatePath("/(dashboard)/product/[id]", "page");
  return offer;
};
