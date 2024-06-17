import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prismadb } from "./lib/db";
import { getUserById } from "./actions/user/get-user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isauth: boolean;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  secret: process.env.AUTH_SECRET,
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: { id: user.id },
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
      const resp = await getUserById({ id: user?.id! });
      const existuser = resp?.details && !resp.error;
      if (!existuser) return false;

      return true;
    },
    async jwt({ token, session, account }) {
      if (!token.sub) return token;

      const resp = await getUserById({ id: token.sub });
      const user = resp?.details;
      if (!resp?.error || !user) return token;

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
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});
