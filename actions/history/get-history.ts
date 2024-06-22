"use server";

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const getUserHistory = async (): Promise<ActionResponse> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    const history = await prismadb.history.findMany({
      where: {
        userId,
      },
    });
    return { error: false, details: history };
  } catch (error) {
    return { error: true, details: "something went wrong" };
  }
};
