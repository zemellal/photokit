import { cache } from "react";
import "server-only";

import { prisma } from "../prisma";
import { Ownership, Prisma, User } from "@prisma/client";
import { auth } from "@/auth";

async function getSessionId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not found.");
  return session.user.id;
}

//  READ many / list
//  Get Ownership
//
export const listOwnershipsWithProducts = cache(async () => {
  const items = prisma.ownership.findMany({
    include: { products: true },
    orderBy: { purchaseDate: "desc" },
    where: { userId: await getSessionId() },
  });
  return items;
});

const ownershipWithProducts = Prisma.validator<Prisma.OwnershipDefaultArgs>()({
  include: {
    products: true,
  },
});

export type OwnershipWithProducts = Prisma.OwnershipGetPayload<
  typeof ownershipWithProducts
>;

export const listOwnershipsWithProductsLens = cache(async () => {
  const items = prisma.ownership.findMany({
    include: { products: { include: { lens: true, camera: true } } },
    orderBy: { purchaseDate: "desc" },
    where: { userId: await getSessionId() },
  });
  return items;
});

export const findOwnershipByProductId = cache(
  async (pid: Ownership["productId"]) => {
    return prisma.ownership.findMany({
      where: {
        userId: await getSessionId(),
        productId: pid,
      },
    });
  }
);

// CREATE
// add a product to a user's ownership
//
export async function createOwnership(
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) {
  // const ownershipWithUserId = { ...data, users: { connect: { id: userId } } };
  return prisma.ownership.create({
    data: { ...data, userId: await getSessionId() },
  });
}

// DELETE
// delete a product from a user's ownership
//
export function removeOwnership(id: Ownership["id"]) {
  return prisma.ownership.delete({ where: { id: id } });
}

// UPDATE
// edit a user's ownership
export function editOwnership(
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) {
  return prisma.ownership.update({ where: { id: id }, data: data });
}
