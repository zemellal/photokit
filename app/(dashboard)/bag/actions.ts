"use server";
import { revalidatePath } from "next/cache";

import {
  createOwnership,
  updateOwnership,
  deleteOwnership,
} from "@/data/ownership";
import { Ownership, Prisma } from "@prisma/client";
import { OwnershipSchema } from "@/lib/zod";

export const createOwnershipAction = async (
  data: Prisma.OwnershipUncheckedCreateWithoutUserInput
) => {
  console.log(`creating entry in server: ${data}`);
  const validated = OwnershipSchema.parse(data);

  const ownership = await createOwnership(validated);
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
  const validated = OwnershipSchema.parse(data);

  const ownership = await updateOwnership(id, validated);
  console.log(ownership);
  revalidatePath("/", "layout");
  return ownership;
};
