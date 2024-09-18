import { cache } from "react";
import "server-only";

import { prisma } from "@/lib/db";
import { Prisma, User } from "@prisma/client";
import { getSessionId } from "./auth";

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
 * Get unique user by user id
 *
 * @param userId - the user's unique id
 *
 * @group User
 */
const getUserById = cache(async (userId: User["id"]) => {
  return await prisma.user.findUnique({ where: { id: userId } });
});

/**
 * Return the logged in user, by the session token
 *
 * @group User
 */
export const getLoggedInUser = cache(async () => {
  const userId = await getSessionId();
  return await getUserById(userId);
});

/**
 * Update user, for the logged in user
 *
 * @group User
 */
export const updateUser = async (data: Prisma.UserUpdateInput) => {
  const userId = await getSessionId();
  return await prisma.user.update({
    data,
    where: { id: userId },
  });
};

/**
 * Get Accounts for the logged in user
 */
export const getAccounts = async () => {
  const userId = await getSessionId();
  return await prisma.account.findMany({
    where: { userId: userId },
  });
};
