"use server";
import { revalidatePath } from "next/cache";

import {
  createKitProduct,
  createKit,
  deleteKit,
  getKits,
  deleteKitProduct,
  updateKit,
} from "@/data/kits";
import { KitCreateSchema } from "@/lib/zod";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";

// Kit actions
/** Server action to create a user's kit
 * @param data - the input with kit details
 */
export const createKitAction = async (
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) => {
  const validData = KitCreateSchema.parse(data);
  const ownership = await createKit(validData);

  revalidatePath("/kits", "page");
  return ownership;
};

/** Server action to get user's kits */
export const getKitsAction = async () => {
  console.log(`getKitsAction`);
  return await getKits();
};

/** Server action to delete a user's kit by id */
export const deleteKitAction = async (id: Kit["id"]) => {
  console.log(`deleteKitAction: ${id}`);
  const deletedKit = await deleteKit(id);
  console.log(deletedKit);

  revalidatePath("/kits", "page");
  return deletedKit;
};

/** Server action to edit a user's kit by id */
export const editKitAction = async (
  id: Kit["id"],
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) => {
  console.log(`editKitAction: ${id}`);
  const validData = KitCreateSchema.parse(data);
  const kit = await updateKit(id, validData);

  revalidatePath("/kits", "page");
  return kit;
};

// Kit Item actions
// TODO: check that the kit belongs to that user
/**
 * Server action to add a kit entry (a product to the kit)
 * @param data
 * @returns
 */
export const createKitItemAction = async (
  data: Prisma.ProductsOnKitsUncheckedCreateInput
) => {
  console.log(
    `addProductToKitAction: { kitId: ${data.kitId}, productId: ${data.productId} }`
  );
  const kitItem = await createKitProduct(data);
  revalidatePath("/kits", "page");
  return kitItem;
};

/**
 * Server action to delete a kit entry (remove the product from the kit)
 * @param kitItem
 * @returns
 */
export const deleteKitItemAction = async (kitItem: ProductsOnKits) => {
  console.log(
    `deleteKitItemAction: { kitId: ${kitItem.kitId}, productId: ${kitItem.productId} }`
  );
  const removedKitItem = await deleteKitProduct(kitItem);

  revalidatePath("/kits", "page");
  return removedKitItem;
};
