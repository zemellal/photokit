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
export function getUserByEmail(email: string) {
  const user = prisma.user.findUnique({ where: { email: email } });
  return user;
}

/**
 * Find unique user by user id
 *
 * @param userId - the user's unique id
 *
 * @group User
 */
export const findUserByID = cache((userId: User["id"]) => {
  return prisma.user.findUnique({ where: { id: userId } });
});
