"use server";

import { signIn } from "@/auth";

const signInAction = async (data: { email: string; password: string }) => {
  // console.log("signInAction", data);
  await signIn("credentials", data);
};

export { signInAction };
