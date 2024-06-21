import NextAuth, { DefaultSession } from "next-auth";
import { prismadb } from "./lib/db";
import { getUserById } from "./actions/user/get-user";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"; // u can import from @next-auth/prisma-adapter
import { User as PrismaUser } from "@prisma/client";
import type DefaultUser from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & {
//       isauth: boolean;
//       id: number;
//     };
//   }
// }

interface ModifiedUser extends Omit<DefaultSession["user"], "id"> {
  id: PrismaUser["id"];
  emailVerified?: PrismaUser["emailVerified"];
  email_verified?: boolean;
  impersonatedByUID?: number;
  belongsToActiveTeam?: boolean;
  organizationId?: number | null;
  username?: PrismaUser["username"];
  name?: PrismaUser["name"];
  email?: PrismaUser["email"];
  image: PrismaUser["image"];
  bio: PrismaUser["bio"];
}

declare module "next-auth" {
  interface Session {
    hasValidLicense: boolean;
    user: ModifiedUser;
  }
}

// @prisma/client@5.14.0, prisma 5.14.0, next-auth@5.0.0-beta.15
// https://github.com/nextauthjs/next-auth/issues/6106

function isNumeric(n: string | number) {
  if (!n) {
    return false;
  }

  if (typeof n == "string") {
    return !isNaN(parseInt(n));
  }
  return isFinite(n);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },

  events: {
    async linkAccount({ user }) {
      if (!isNumeric(user?.id!))
        throw new Error("linkaccount: id should be a number");

      await prismadb.user.update({
        where: { id: Number(user.id) },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // check if email is verified
      if (!isNumeric(user?.id!))
        throw new Error("linkaccount: id should be a number");

      const resp = await getUserById({ id: Number(user.id) });
      const existuser = resp?.details && !resp.error;
      console.log({ existuser });
      if (!existuser) return false;

      return true;
    },
    async jwt({ token, session, account }) {
      if (!token.sub) return token;

      if (!isNumeric(token.sub))
        throw new Error("jwt: token should be a number");

      const resp = await getUserById({ id: Number(token.sub) });
      const user = resp?.details;
      if (resp?.error || !user) return token;

      token.isauth = !!(account?.provider !== "credentials");
      token.id = user.id;
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        session.user.isauth = token.isauth;
        session.user.id = token.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prismadb) as any,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
