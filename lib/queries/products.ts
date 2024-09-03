import { cache } from "react";
import "server-only";

import { Prisma, Product } from "@prisma/client";
import { prisma } from "../prisma";
import { getSessionId } from "@/auth";
import { unstable_cache } from "next/cache";

const revalidate = 60 * 60 * 24 * 3;

/**
 * Get all products
 *
 * @group Product
 */
export const getProducts = cache(() => {
  console.log("getProducts");
  const products = prisma.product.findMany({
    orderBy: [{ releaseDate: "desc" }],
  });
  return products;
});

/**
 * Get all products including Brand and Ownership data
 *
 * @group Product
 */
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

/**
 * Get the product's details by id, includes Brand, lens and camera details
 *
 * @group Product
 */
export const getProductWithDetailsById = cache(async (id: Product["id"]) => {
  console.log(`getProductWithDetailsById: ${id}`);
  const product = prisma.product.findUnique({
    where: { id },
    include: {
      Brand: true,
      lens: { include: { mounts: true } },
      camera: { include: { mounts: true } },
      ownership: {
        where: {
          userId: await getSessionId(),
          productId: id,
        },
      },
      Offer: { orderBy: { date: "desc" } },
    },
  });
  return product;
});

/**
 * Create a product
 * @param data - product data input
 * @returns
 *
 * @group Product
 */
export const createProduct = (data: Prisma.ProductUncheckedCreateInput) => {
  return prisma.product.create({ data: { ...data } });
};

/**
 * Get brands
 *
 * @group Brand
 */
export const getBrands = cache(() => {
  console.log("getBrands");
  return prisma.brand.findMany();
});

/**
 * Get cached brands
 *
 * @group Brand
 */
export const getCachedBrands = unstable_cache(
  async () => {
    return await prisma.brand.findMany();
  },
  ["brands"],
  { revalidate, tags: ["brands"] }
);

/**
 * Get mounts
 *
 * @group Mount
 */
export const getMounts = cache(() => {
  console.log("getMounts");
  return prisma.mount.findMany();
});

/**
 * Get cached mounts
 *
 * @group Mount
 */
export const getCachedMounts = unstable_cache(
  async () => {
    return await prisma.mount.findMany();
  },
  ["mounts"],
  { revalidate, tags: ["mounts"] }
);
