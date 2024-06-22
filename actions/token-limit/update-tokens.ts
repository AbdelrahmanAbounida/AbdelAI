"use server";

import { auth } from "@/auth";
import { FREE_PLAN_INIT_TOKENS } from "@/constants";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const updateTokenLimit = async (
  token_usage: number
): Promise<ActionResponse> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    // const userTokens = await prismadb.tokenLimit.findUnique({
    //   where: {
    //     userId,
    //   },
    // });
    const newLimit = await prismadb.tokenLimit.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        count: FREE_PLAN_INIT_TOKENS - token_usage,
      },
      update: {
        count: { decrement: token_usage },
      },
    });
    return { error: false, details: newLimit };
  } catch (error) {
    return { error: true, details: "something went wrong" };
  }
};
