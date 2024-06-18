"use server";
import { signIn } from "@/auth";
import { prismadb } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECTED } from "@/routes";
import { LoginSchema } from "@/schemas/auth-schemas";
import { ActionResponse } from "@/schemas/common";
import { AuthError } from "next-auth";

export const loginUser = async ({
  email,
  password,
}: // callbackurl,
{
  email: string;
  password: string;
  // callbackurl: string | null;
}): Promise<ActionResponse> => {
  try {
    const validFields = LoginSchema.safeParse({ email, password });
    if (!validFields.success) {
      return { error: true, details: "Email or password is not valid" };
    }

    // check if email exists
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user?.email || !user?.hashedPassword)
      return { error: true, details: "Email doesn't exist" };

    // login the user
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECTED, // callbackurl ||
    });

    return { error: false, details: "You logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, details: "Invalid credentials" };

        default:
          return { error: true, details: "Something went wrong" };
      }
    }
    // return { error: "Something went wrong" };
    throw error;
  }
};
