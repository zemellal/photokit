"use server";

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
