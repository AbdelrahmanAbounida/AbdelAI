"use server";

import { auth } from "@/auth";
import { FREE_PLAN_INIT_TOKENS } from "@/constants";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const addHistory = async (content: string): Promise<ActionResponse> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    const newHistory = await prismadb.history.create({
      data: {
        userId,
        content,
      },
    });
    return { error: false, details: newHistory };
  } catch (error) {
    return { error: true, details: "something went wrong" };
  }
};
