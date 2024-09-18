import { auth } from "@/auth";

/** Get User ID from Session Auth */
export const getSessionId = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not found.");
  return session.user.id;
};
