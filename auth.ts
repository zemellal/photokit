import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

import GitHub from "next-auth/providers/github";
// import Credentials from "next-auth/providers/credentials";
// import { signInSchema } from "./lib/zod";
// import { ZodError } from "zod";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  GitHub,
  // Credentials({
  //   name: "Credentials",
  //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  //   // e.g. domain, username, password, 2FA token, etc.
  //   credentials: {
  //     email: {},
  //     password: {},
  //   },
  //   authorize: async (c, req) => {
  //     try {
  //       console.log("trying to authorize credentials");
  //       let user: any = null;

  //       const { email, password } = await signInSchema.parseAsync(c);

  //       // logic to salt and hash password
  //       const pwHash = saltAndHashPassword(password);

  //       // logic to verify if the user exists
  //       user = await prisma.user.findUnique({ where: { email } });
  //       // console.log("user from db: ", user);

  //       if (!user) {
  //         throw new Error("User not found.");
  //       }

  //       // return JSON object with the user data
  //       return user;
  //     } catch (error) {
  //       if (error instanceof ZodError) {
  //         // Return `null` to indicate that the credentials are invalid
  //         return null;
  //       }
  //     }
  //   },
  // }),
];

/** Get User ID from Session Auth */
export const getSessionId = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not found.");
  return session.user.id;
};

/** If we need to access the auth providers in a custom component */
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

// async function session({ session, token }: { session: any; token: any }) {
//   if (token) {
//     session.user = token;
//   }
//   return session.user;
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      if (trigger === "update") token.name = session?.user?.name;
      return token;
    },
    session: async ({ session, user, token }) => {
      session.user.id = token.id as string;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  trustHost: true,
  pages: {
    // signIn: "/signin",
  },
});
