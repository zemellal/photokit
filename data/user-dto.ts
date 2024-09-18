import "server-only";
import { cache } from "react";

import { getLoggedInUser } from "./users";
import { User } from "@prisma/client";

const canSeeEmail = (viewer: User) => {
  // do any checks
  return true;
};

const canSeeName = (viewer: User) => {
  // do any checks
  return true;
};

export const getProfileDTO = cache(async () => {
  const user = await getLoggedInUser();

  if (!user) throw Error("No user found");

  return {
    email: canSeeEmail(user) ? user.email : null,
    name: canSeeName(user) ? user.name : null,
  };
});
