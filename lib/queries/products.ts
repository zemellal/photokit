import { cache } from "react";
import "server-only";

import { Prisma, Product } from "@prisma/client";
import { prisma } from "../prisma";
import { auth } from "@/auth";

async function getSessionId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not found.");
  return session.user.id;
}

export const getProducts = cache(() => {
  console.log("getProducts");
  const products = prisma.product.findMany({
    orderBy: [{ releaseDate: "desc" }],
  });
  return products;
});

export const getProductsWithOwnershipBrands = cache(async () => {
  console.log("getProductsWithOwnership");
  const products = prisma.product.findMany({
    include: {
      Brand: true,
      ownership: { where: { userId: await getSessionId() } },
    },
    orderBy: [{ releaseDate: "desc" }],
  });
  return products;
});
export type ProductsWithOwnershipBrands = Prisma.PromiseReturnType<
  typeof getProductsWithOwnershipBrands
>;

export const getProductWithDetailsById = cache((id: Product["id"]) => {
  console.log(`getProductWithDetailsById: ${id}`);
  const product = prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      Brand: true,
      lens: { include: { mounts: true } },
      camera: { include: { mounts: true } },
    },
  });
  return product;
});

export const getProductWithBrandsByName = cache((name: Product["name"]) => {
  console.log(`getProductWithBrandsByName: ${name}`);
  const product = prisma.product.findUniqueOrThrow({ where: { name } });
  return product;
});

export const createProduct = (data: Prisma.ProductUncheckedCreateInput) => {
  return prisma.product.create({ data: { ...data } });
};

export const getBrands = cache(() => {
  console.log("getBrands");
  return prisma.brand.findMany();
});

export const getMounts = cache(() => {
  console.log("getMounts");
  return prisma.mount.findMany();
});
