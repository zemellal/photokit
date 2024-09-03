import { cache } from "react";
import "server-only";

import { prisma } from "@/lib/db";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";
import { getSessionId } from "@/auth";

/**
 * Create a user's kit
 * @param data - kit data
 * @group Kits
 */
export async function createKit(
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) {
  const kit = prisma.kit.create({
    data: { ...data, ownerId: await getSessionId() },
  });

  return kit;
}

/**
 * Get user's kits, ordered by descending creation date
 * @returns {Kit[]}
 * @group Kits
 */
export const getKits = cache(async () => {
  return prisma.kit.findMany({
    where: { ownerId: await getSessionId() },
    orderBy: { createdOn: "desc" },
  });
});

/**
 * Get user's kits with the joined product and product details
 * @group Kits
 */
export const getKitsWithProductsOnKits = cache(async () => {
  const kits = prisma.kit.findMany({
    where: { ownerId: await getSessionId() },
    orderBy: { createdOn: "desc" },
    include: {
      ProductsOnKits: { include: { product: true } },
    },
  });
  return kits;
});
export type KitsWithProductsOnKits = Prisma.PromiseReturnType<
  typeof getKitsWithProductsOnKits
>;

/**
 * Update the user's kit by kitId
 * @group Kits
 */
export function updateKit(
  id: Kit["id"],
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) {
  return prisma.kit.update({ where: { id: id }, data });
}

/**
 * Delete the user's kit by kitId
 * @group Kits
 */
export function deleteKit(id: Kit["id"]) {
  return prisma.kit.delete({ where: { id: id } });
}

/**
 * Get the kit count for the user
 * @group Kits
 */
export const getKitCount = cache(async () => {
  const kitCount = prisma.kit.count({
    where: { ownerId: await getSessionId() },
  });
  return kitCount;
});

/** Add a product to the user's kit. Creates an entry in ProductsOnKits table
 * @param {ProductsOnKits} data
 * @group ProductsOnKits
 */
export function addProductToKit(data: ProductsOnKits) {
  const kitItem = prisma.productsOnKits.create({ data });
  return kitItem;
}

/** Delete a product in the user's kit. Deletes the entry in ProductsOnKits table
 * @param kitItem - the kit item (product on kit) to be deleted
 * @returns the deleted kit item
 * @group ProductsOnKits
 */
export function removeKitItem(kitItem: ProductsOnKits) {
  const removedItem = prisma.productsOnKits.delete({
    where: {
      productId_kitId: { productId: kitItem.productId, kitId: kitItem.kitId },
    },
  });
  return removedItem;
}
