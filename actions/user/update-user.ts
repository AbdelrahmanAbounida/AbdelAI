"use server";

import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";
import { User } from "@prisma/client";

export const updateUser = async ({
  email,
  ...data
}: Partial<User>): Promise<ActionResponse> => {
  try {
    const updatedUser = await prismadb.user.update({
      where: {
        email,
      },
      data,
    });
    return { error: false, details: updatedUser };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
