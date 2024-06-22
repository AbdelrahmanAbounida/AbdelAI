"use server";

import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { FREE_PLAN_INIT_TOKENS, MUSIC_TOKEN_USAGE } from "@/constants";
// import { Replicate } from "@langchain/community/llms/replicate";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";
import Replicate from "replicate";

export const generateMusic = async ({
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

    if (!userLimit || userLimit < MUSIC_TOKEN_USAGE) {
      return {
        error: true,
        details: "You don't have enough tokens to generate music",
      };
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });
    const model =
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05";

    const res = await replicate.run(model, {
      input: {
        prompt,
        alpha: 0.5,
        prompt_a: prompt,
        prompt_b: "90's rap",
        denoising: 0.75,
        seed_image_id: "vibes",
        num_inference_steps: 50,
      },
    });
    // update token usage

    await prismadb.tokenLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit - MUSIC_TOKEN_USAGE,
      },
    });

    // update histrory
    await prismadb.history.create({
      data: {
        userId,
        content: `Generated new Music with prompt ${prompt.slice(0, 11)}... `,
      },
    });
    return { error: false, details: res };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
