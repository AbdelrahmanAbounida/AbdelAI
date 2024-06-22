"use server";

import { auth } from "@/auth";
import { FREE_PLAN_INIT_TOKENS } from "@/constants";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const getUserTokens = async (): Promise<ActionResponse> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    const userTokens = await prismadb.tokenLimit.findUnique({
      where: {
        userId,
      },
    });
    if (!userTokens) {
      const newLimit = await prismadb.tokenLimit.create({
        data: {
          userId,
          count: FREE_PLAN_INIT_TOKENS,
        },
      });
      return { error: false, details: newLimit };
    }
    return { error: false, details: userTokens };
  } catch (error) {
    return { error: true, details: "something went wrong" };
  }
};

export const CheckTokenLimit = async (
  limit: number
): Promise<ActionResponse> => {
  try {
    const resp = await getUserTokens();

    if (resp?.error) {
      return resp;
    }
    let userLimit = resp?.details?.count;

    if (!userLimit || userLimit < limit) {
      // TEXT_TOKEN_USAGE
      return {
        error: true,
        details: "You don't have enough tokens to generate answer",
      };
    }
    return { error: false, details: "" };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
