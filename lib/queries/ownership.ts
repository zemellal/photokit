import { cache } from "react";
import "server-only";

import prisma from "../prismaClient";
import { Ownership, Prisma } from "@prisma/client";
import { mock_userId } from "..";

//  READ many / list
//  Get Ownership
//
export const listOwnershipsWithProducts = cache(() => {
  const items = prisma.ownership.findMany({
    include: { products: true },
    orderBy: { purchaseDate: "desc" },
    where: { userId: mock_userId },
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

export const listOwnershipsWithProductsLens = cache(() => {
  const items = prisma.ownership.findMany({
    include: { products: { include: { lens: true, camera: true } } },
    orderBy: { purchaseDate: "desc" },
    where: { userId: mock_userId },
  });
  return items;
});

export const findOwnershipByProductId = cache((pid: Ownership["productId"]) => {
  return prisma.ownership.findMany({
    where: {
      userId: mock_userId,
      productId: pid,
    },
  });
});

// CREATE
// add a product to a user's ownership
//
export function createOwnership(
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) {
  // const ownershipWithUserId = { ...data, users: { connect: { id: userId } } };
  return prisma.ownership.create({
    data: { ...data, userId: mock_userId },
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
