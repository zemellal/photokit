import { cache } from "react";
import "server-only";

import { prisma } from "../prisma";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";
import { auth } from "@/auth";

async function getSessionId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not found.");
  return session.user.id;
}

// create a kit
export async function createKit(
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) {
  const kit = prisma.kit.create({
    data: { ...data, ownerId: await getSessionId() },
  });

  return kit;
}

// read kits
export const getKits = cache(async () => {
  return prisma.kit.findMany({
    where: { ownerId: await getSessionId() },
    orderBy: { createdOn: "desc" },
  });
});

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

// update kit
export function updateKit(
  id: Kit["id"],
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) {
  return prisma.kit.update({ where: { id: id }, data });
}

// delete kit
export function deleteKit(id: Kit["id"]) {
  return prisma.kit.delete({ where: { id: id } });
}

export const getKitCount = cache(async () => {
  const kitCount = prisma.kit.count({
    where: { ownerId: await getSessionId() },
  });
  return kitCount;
});

// add product to kit
export function addProductToKit(data: ProductsOnKits) {
  const kitItem = prisma.productsOnKits.create({ data });
  return kitItem;
}

// remove product from kit
export function removeKitItem(kitItem: ProductsOnKits) {
  const removedItem = prisma.productsOnKits.delete({
    where: {
      productId_kitId: { productId: kitItem.productId, kitId: kitItem.kitId },
    },
  });
  return removedItem;
}
