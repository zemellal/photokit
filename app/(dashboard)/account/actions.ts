"use server";
import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";
import { UserProfileSchema } from "@/lib/zod";
import { updateUser } from "@/data/users";

export const updateProfileAction = async (data: Prisma.UserUpdateInput) => {
  const { email, ...rest } = data;
  const validated = UserProfileSchema.parse(rest);
  console.log(`validated data: `, validated);

  const result = await updateUser(validated);
  console.log(result);
  revalidatePath("/(dashboard)", "layout");
};
