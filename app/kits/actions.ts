"use server";

import { createKit, deleteKit, removeKitItem } from "@/lib/queries/kits";
import { Kit, Prisma, ProductsOnKits } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Kit actions
export const createKitAction = async (
  data: Prisma.KitUncheckedCreateWithoutOwnerInput
) => {
  const ownership = await createKit(data);

  revalidatePath("/");
  return ownership;
};

export const deleteKitAction = async (id: Kit["id"]) => {
  console.log(`deleteKitAction: ${id}`);
  const deletedKit = await deleteKit(id);
  console.log(deletedKit);

  revalidatePath("/");
  return deletedKit;
};

// Kit Item actions
export const deleteKitItemAction = async (kitItem: ProductsOnKits) => {
  console.log(
    `deleteKitItemAction: { kitId: ${kitItem.kitId}, productId: ${kitItem.productId} }`
  );
  const removedKitItem = await removeKitItem(kitItem);

  revalidatePath("/");
  return removedKitItem;
};
