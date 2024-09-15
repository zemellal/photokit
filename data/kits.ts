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
  const kit = await prisma.kit.create({
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
  return await prisma.kit.findMany({
    where: { ownerId: await getSessionId() },
    orderBy: { createdAt: "desc" },
  });
});

/**
 * Get user's kits with the joined product and product details
 * @group Kits
 */
export const getKitsWithProductsOnKits = cache(async () => {
  const kits = await prisma.kit.findMany({
    where: { ownerId: await getSessionId() },
    orderBy: { createdAt: "desc" },
    include: {
      productsOnKits: { include: { product: true } },
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
export async function updateKit(
  id: Kit["id"],
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) {
  return await prisma.kit.update({ where: { id: id }, data });
}

/**
 * Delete the user's kit by kitId
 * @group Kits
 */
export async function deleteKit(id: Kit["id"]) {
  return await prisma.kit.delete({ where: { id: id } });
}

/**
 * Get the kit count for the user
 * @group Kits
 */
export const getKitCount = cache(async () => {
  const kitCount = await prisma.kit.count({
    where: { ownerId: await getSessionId() },
  });
  return kitCount;
});

/** Add a product to the user's kit. Creates an entry in ProductsOnKits table
 * @param {ProductsOnKits} data
 * @group ProductsOnKits
 */
export async function createKitProduct(data: ProductsOnKits) {
  // TODO: check if the user is the owner of the kit

  const kitItem = await prisma.productsOnKits.create({ data });
  return kitItem;
}

/** Delete a product in the user's kit. Deletes the entry in ProductsOnKits table
 * @param kitItem - the kit item (product on kit) to be deleted
 * @returns the deleted kit item
 * @group ProductsOnKits
 */
export async function deleteKitProduct(kitItem: ProductsOnKits) {
  // TODO: check if the user is the owner of the kit

  const removedItem = await prisma.productsOnKits.delete({
    where: {
      productId_kitId: { productId: kitItem.productId, kitId: kitItem.kitId },
    },
  });
  return removedItem;
}
