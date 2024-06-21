"use server";

import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { CODE_TOKEN_USAGE, FREE_PLAN_INIT_TOKENS } from "@/constants";
import { ChatOpenAI } from "@langchain/openai";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

// ::TODO:: Stream code generation
export const generateCode = async ({
  prompt,
}: {
  prompt: string;
}): Promise<ActionResponse> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    // check token limit
    const resp = await getUserTokens();

    if (resp?.error) {
      return resp;
    }
    const userLimit = resp?.details?.count;

    if (!userLimit || userLimit < CODE_TOKEN_USAGE) {
      return {
        error: true,
        details: "You don't have enough tokens to generate code",
      };
    }

    // generate code with openai
    const model = new ChatOpenAI({
      temperature: 0.9,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const res = await model.invoke([
      [
        "system",
        "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation",
      ],
      ["human", prompt],
    ]);

    // update token usage
    await prismadb.tokenLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit - CODE_TOKEN_USAGE,
      },
    });

    // update histrory
    await prismadb.history.create({
      data: {
        userId,
        content: `Generated new code with prompt: ${prompt.slice(0, 10)}... `,
      },
    });
    return { error: false, details: res };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
