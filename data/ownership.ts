import { cache } from "react";
import "server-only";

import { prisma } from "@/lib/db";
import { Ownership, Prisma, User } from "@prisma/client";
import { getSessionId } from "@/data/auth";

/**
 * Get the user's ownerships with product details
 * @group Ownership
 */
export const listOwnershipsWithProduct = cache(async () => {
  const items = await prisma.ownership.findMany({
    include: { product: true },
    orderBy: { purchaseDate: "desc" },
    where: { userId: await getSessionId() },
  });
  return items;
});

const ownershipWithProducts = Prisma.validator<Prisma.OwnershipDefaultArgs>()({
  include: {
    product: true,
  },
});

export type OwnershipWithProducts = Prisma.OwnershipGetPayload<
  typeof ownershipWithProducts
>;

/**
 * Get the user's owned products with details including lens and camera data
 * @group Ownership
 */
export const listOwnershipsWithProductsLens = cache(async () => {
  const items = await prisma.ownership.findMany({
    include: { product: { include: { lens: true, camera: true } } },
    orderBy: { purchaseDate: "desc" },
    where: { userId: await getSessionId() },
  });
  return items;
});

/**
 * Find the ownership by the product id for the user.
 * @param pid - Product ID
 *
 * @group Ownership
 */
export const findOwnershipByProductId = cache(
  async (pid: Ownership["productId"]) => {
    return await prisma.ownership.findMany({
      where: {
        userId: await getSessionId(),
        productId: pid,
      },
    });
  }
);

/**
 * Add (create) a product to a user's ownership. Add an owned product.
 * @param data - The ownership data input
 *
 * @group Ownership
 */
export async function createOwnership(
  data: Prisma.OwnershipUncheckedCreateWithoutUserInput
) {
  const now = new Date();
  return await prisma.ownership.create({
    data: {
      ...data,
      // updatedAt: now.toISOString(),
      userId: await getSessionId(),
    },
  });
}

/**
 * Delete a product from a user's ownership
 * @param id - Ownership ID
 * @returns
 *
 * @group Ownership
 */
export async function deleteOwnership(id: Ownership["id"]) {
  return await prisma.ownership.delete({ where: { id: id } });
}

/**
 * Update a user's ownership
 * @param id - Ownership ID
 * @param data - Updated ownership data input
 * @returns
 *
 * @group Ownership
 */
export async function updateOwnership(
  id: Ownership["id"],
  data: Prisma.OwnershipUncheckedCreateWithoutUserInput
) {
  return await prisma.ownership.update({ where: { id: id }, data: data });
}
