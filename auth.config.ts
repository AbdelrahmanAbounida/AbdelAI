import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas/auth-schemas";
import { getUserByEmail } from "./actions/user/get-user";

export default {
  // secret: process.env.AUTH_SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse({ ...credentials });

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const resp = await getUserByEmail({ email });
          const user = resp?.details;
          if (!user || !user.password) {
            return null;
          }
          // check if password matches
          const validPassword = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (validPassword) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
