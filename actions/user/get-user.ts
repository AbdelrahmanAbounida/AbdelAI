"use server";

import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const getUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<ActionResponse> => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    return { error: false, details: user };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};

export const getUserById = async ({
  id,
}: {
  id: number;
}): Promise<ActionResponse> => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
      // select: {
      //   id: true,
      //   bio: true,
      //   username: true,
      //   plan: true,
      //   email: true,
      //   image: true,
      //   name: true,
      // },
    });
    return { error: false, details: user };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
