import prisma from "../prismaClient";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";

// temporary userId
const userId = "g9om23d7o0rdpigl81e2tl50";

// create a kit
export function createKit(data: Prisma.KitUncheckedCreateWithoutOwnerInput) {
  const kit = prisma.kit.create({ data: { ...data, ownerId: userId } });

  return kit;
}

// read kits
export function getKitsWithProductsOnKits() {
  const kits = prisma.kit.findMany({
    where: { ownerId: userId },
    orderBy: { createdOn: "desc" },
    include: {
      ProductsOnKits: { include: { product: true } },
    },
  });
  return kits;
}
export type KitsWithProductsOnKits = Prisma.PromiseReturnType<
  typeof getKitsWithProductsOnKits
>;

// update kit

// delete kit
export function deleteKit(id: Kit["id"]) {
  return prisma.kit.delete({ where: { id: id } });
}

export function getKitCount() {
  const kitCount = prisma.kit.count({ where: { ownerId: userId } });
  return kitCount;
}

// add product to kit

// remove product from kit
export function removeKitItem(kitItem: ProductsOnKits) {
  const removedItem = prisma.productsOnKits.delete({
    where: {
      productId_kitId: { productId: kitItem.productId, kitId: kitItem.kitId },
    },
  });
  return removedItem;
}
