import { cache } from "react";
import "server-only";

import { prisma } from "../prisma";
import { User } from "@prisma/client";

// get user by email
export function getUserByEmail(email: string) {
  const user = prisma.user.findUnique({ where: { email: email } });
  return user;
}

export const findUserByID = cache((userId: User["id"]) => {
  return prisma.user.findUnique({ where: { id: userId } });
});
