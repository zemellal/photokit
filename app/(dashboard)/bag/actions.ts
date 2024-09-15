"use server";

import {
  createOwnership,
  updateOwnership,
  deleteOwnership,
} from "@/data/ownership";
import { Ownership, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOwnershipAction = async (
  data: Prisma.OwnershipUncheckedCreateWithoutUserInput
) => {
  console.log(`creating entry in server: ${data}`);

  const ownership = await createOwnership(data);

  console.log(ownership);
  revalidatePath("/", "layout");
  return ownership;
};

export const deleteOwnershipAction = async (id: Ownership["id"]) => {
  const owernship = await deleteOwnership(id);

  console.log(owernship);
  revalidatePath("/", "layout");
  return owernship;
};

export const updateOwnershipAction = async (
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUserInput
) => {
  const ownership = await updateOwnership(id, data);

  console.log(ownership);
  revalidatePath("/", "layout");
  return ownership;
};
