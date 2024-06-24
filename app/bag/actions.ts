"use server";

import {
  createOwnership,
  editOwnership,
  removeOwnership,
} from "@/lib/queries/ownership";
import { Ownership, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOwnershipAction = async (
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) => {
  console.log(`creating entry in server: ${data}`);

  const ownership = await createOwnership(data);

  console.log(ownership);
  revalidatePath("/");
  return ownership;
};

export const deleteOwnershipAction = async (id: Ownership["id"]) => {
  const deleteOwnership = await removeOwnership(id);

  console.log(deleteOwnership);
  revalidatePath("/");
  return deleteOwnership;
};

export const editOwnershipAction = async (
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) => {
  const ownership = await editOwnership(id, data);

  console.log(ownership);
  revalidatePath("/");
  return ownership;
};
