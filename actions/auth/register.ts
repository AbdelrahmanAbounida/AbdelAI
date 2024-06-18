"use server";
import { registerSchema } from "@/schemas/auth-schemas";
import { ActionResponse } from "@/schemas/common";
import { z } from "zod";
import { getUserByEmail } from "../user/get-user";
import bcrypt from "bcrypt";
import { prismadb } from "@/lib/db";

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: z.infer<typeof registerSchema>): Promise<ActionResponse> => {
  try {
    const userExists = await getUserByEmail({ email });

    if (userExists?.error) {
      return userExists;
    }
    if (userExists?.details) {
      return { error: true, details: "User with this email already exists" };
    }
    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return { error: false, details: newUser };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
