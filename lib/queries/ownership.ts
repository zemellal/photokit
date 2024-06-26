import { cache } from "react";
import "server-only";

import prisma from "../prismaClient";
import { Ownership, Prisma } from "@prisma/client";
import { mock_userId } from "..";

// gets all owned products by the user
export const listOwnershipsWithProducts = cache(() => {
  const items = prisma.ownership.findMany({
    include: { products: true },
    orderBy: { purchased_on: "desc" },
    where: { user_id: mock_userId },
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

// add a product to a user's ownership
export function createOwnership(
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) {
  // const ownershipWithUserId = { ...data, users: { connect: { id: userId } } };
  return prisma.ownership.create({
    data: { ...data, user_id: mock_userId },
  });
}

// delete a product from a user's ownership
export function removeOwnership(id: Ownership["id"]) {
  return prisma.ownership.delete({ where: { id: id } });
}

// edit a user's ownership
export function editOwnership(
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUsersInput
) {
  return prisma.ownership.update({ where: { id: id }, data: data });
}

export const findOwnershipByProductId = cache(
  (pid: Ownership["product_id"]) => {
    return prisma.ownership.findMany({
      where: {
        user_id: mock_userId,
        product_id: pid,
      },
    });
  }
);
