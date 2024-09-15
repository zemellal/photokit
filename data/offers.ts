import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

/**
 * Create a new product Offer. Keeps track of historical offers and pricing for the a product
 *
 * @param data
 * @returns
 */
export const createOffer = async (data: Prisma.OfferUncheckedCreateInput) => {
  return await prisma.offer.create({ data: { ...data } });
};
