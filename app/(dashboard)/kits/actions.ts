"use server";

import {
  addProductToKit,
  createKit,
  deleteKit,
  getKits,
  removeKitItem,
  updateKit,
} from "@/lib/queries/kits";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Kit actions
export const createKitAction = async (
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) => {
  const ownership = await createKit(data);

  revalidatePath("/kits", "page");
  return ownership;
};

export const getKitsAction = async () => {
  console.log(`getKitsAction`);
  return await getKits();
};

export const deleteKitAction = async (id: Kit["id"]) => {
  console.log(`deleteKitAction: ${id}`);
  const deletedKit = await deleteKit(id);
  console.log(deletedKit);

  revalidatePath("/kits", "page");
  return deletedKit;
};

export const editKitAction = async (
  id: Kit["id"],
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) => {
  console.log(`editKitAction: ${id}`);
  const kit = await updateKit(id, data);
  console.log(kit);

  revalidatePath("/kits", "page");
  return kit;
};

// Kit Item actions
// TODO: check that the kit belongs to that user
export const addProductToKitAction = async (
  data: Prisma.ProductsOnKitsUncheckedCreateInput
) => {
  console.log(
    `addProductToKitAction: { kitId: ${data.kitId}, productId: ${data.productId} }`
  );
  const kitItem = await addProductToKit(data);
  revalidatePath("/kits", "page");
  return kitItem;
};

export const deleteKitItemAction = async (kitItem: ProductsOnKits) => {
  console.log(
    `deleteKitItemAction: { kitId: ${kitItem.kitId}, productId: ${kitItem.productId} }`
  );
  const removedKitItem = await removeKitItem(kitItem);

  revalidatePath("/kits", "page");
  return removedKitItem;
};
