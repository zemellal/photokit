"use server";

import {
  createOwnership,
  editOwnership,
  removeOwnership,
} from "@/data/ownership";
import { Ownership, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOwnershipAction = async (
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) => {
  console.log(`creating entry in server: ${data}`);

  const ownership = await createOwnership(data);

  console.log(ownership);
  revalidatePath("/", "layout");
  return ownership;
};

export const deleteOwnershipAction = async (id: Ownership["id"]) => {
  const deleteOwnership = await removeOwnership(id);

  console.log(deleteOwnership);
  revalidatePath("/", "layout");
  return deleteOwnership;
};

export const editOwnershipAction = async (
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) => {
  const ownership = await editOwnership(id, data);

  console.log(ownership);
  revalidatePath("/", "layout");
  return ownership;
};
