"use server";

import { createOffer } from "@/lib/queries/offers";
import { createProduct } from "@/lib/queries/products";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProductAction = async (
  data: Prisma.ProductUncheckedCreateInput
) => {
  console.log(`creating entry in server: ${data}`);

  const product = await createProduct(data);
  console.log(product);
  revalidatePath("/browse", "page");
  redirect("/browse");
  // return product;
};

export const createOfferAction = async (
  data: Prisma.OfferUncheckedCreateInput
) => {
  console.log(`creating offer in server: ${data}`);

  const offer = await createOffer(data);

  revalidatePath("/(dashboard)/product/[id]", "page");
  return offer;
};
