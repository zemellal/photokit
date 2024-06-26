import { mock_userId } from "..";
import prisma from "../prismaClient";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";

// create a kit
export function createKit(data: Prisma.KitUncheckedCreateWithoutOwnerInput) {
  const kit = prisma.kit.create({ data: { ...data, ownerId: mock_userId } });

  return kit;
}

// read kits
export function getKits() {
  return prisma.kit.findMany({
    where: { ownerId: mock_userId },
    orderBy: { createdOn: "desc" },
  });
}

export function getKitsWithProductsOnKits() {
  const kits = prisma.kit.findMany({
    where: { ownerId: mock_userId },
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

export function getKitCount() {
  const kitCount = prisma.kit.count({ where: { ownerId: mock_userId } });
  return kitCount;
}

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
