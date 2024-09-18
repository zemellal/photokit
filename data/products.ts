import { cache } from "react";
import "server-only";

import { Prisma, Product } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSessionId } from "@/data/auth";
import { unstable_cache } from "next/cache";

/**
 * Get all products
 *
 * @group Product
 */
export const getProducts = cache(async () => {
  console.log("getProducts");
  const products = await prisma.product.findMany({
    // orderBy: [{ releaseDate: "desc" }],
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
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      ownerships: { where: { userId: await getSessionId() } },
    },
    // orderBy: [{ releaseDate: "desc" }],
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
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      lens: { include: { mount: true } },
      camera: { include: { mount: true } },
      ownerships: {
        where: {
          userId: await getSessionId(),
          productId: id,
        },
      },
      offers: { orderBy: { date: "desc" } },
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
export const createProduct = async (
  data: Prisma.ProductUncheckedCreateInput
) => {
  return await prisma.product.create({ data: { ...data } });
};

/**
 * Get brands
 *
 * @group Brand
 */
export const getBrands = cache(async () => {
  console.log("getBrands");
  return await prisma.brand.findMany();
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
  { revalidate: 60 * 60 * 24 * 3, tags: ["brands"] }
);

/**
 * Get mounts
 *
 * @group Mount
 */
export const getMounts = cache(async () => {
  console.log("getMounts");
  return await prisma.mount.findMany();
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
  { revalidate: 60 * 60 * 24 * 3, tags: ["mounts"] }
);
