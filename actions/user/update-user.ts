"use server";

import { ProfileFormValues } from "@/app/(dashboard)/_components/settings/profile-form";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";
import { z } from "zod";

export const updateUser = async ({
  email,
  username,
  bio,
}: ProfileFormValues): Promise<ActionResponse> => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { error: true, details: "unauthorized" };
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: user?.id,
      },
      data: {
        bio,
        username,
      },
    });
    return { error: false, details: updatedUser };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
