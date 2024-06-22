"use server";
import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { TEXT_TOKEN_USAGE } from "@/constants";
import { ChatOpenAI } from "@langchain/openai";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

// for streaming response use /api/chat endpoint
export const generateText = async ({
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

    if (!userLimit || userLimit < TEXT_TOKEN_USAGE) {
      return {
        error: true,
        details: "You don't have enough tokens to generate answer",
      };
    }

    // generate text with openai
    const model = new ChatOpenAI({
      temperature: 0.9,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const res = await model.invoke([
      ["system", "You are QA assistant."],
      ["human", prompt],
    ]);

    // update token usage
    await prismadb.tokenLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit - TEXT_TOKEN_USAGE,
      },
    });

    // update histrory
    await prismadb.history.create({
      data: {
        userId,
        content: `Generated new answer for question: ${prompt.slice(
          0,
          10
        )}... `,
      },
    });
    return { error: false, details: res };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
