import { cache } from "react";
import "server-only";

import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

/**
 * Find user by unique email
 * @param email - user's email
 * @returns
 *
 * @group User
 */
export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  return user;
}

/**
 * Find unique user by user id
 *
 * @param userId - the user's unique id
 *
 * @group User
 */
export const findUserByID = cache(async (userId: User["id"]) => {
  return await prisma.user.findUnique({ where: { id: userId } });
});
