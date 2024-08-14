"use server";

import { createProduct } from "@/lib/queries/products";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProductAction = async (
  data: Prisma.ProductUncheckedCreateInput
) => {
  console.log(`creating entry in server: ${data}`);

  const product = await createProduct(data);
  console.log(product);
  revalidatePath("/browse");
  return product;
};
