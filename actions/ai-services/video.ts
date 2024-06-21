"use server";

import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { FREE_PLAN_INIT_TOKENS, VIDEO_TOKEN_USAGE } from "@/constants";
import { Replicate } from "@langchain/community/llms/replicate";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";

export const generateVideo = async ({
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

    // create tokenlimit if not exists
    let userLimit = resp?.details?.count;

    if (!userLimit || userLimit < VIDEO_TOKEN_USAGE) {
      return {
        error: true,
        details: "You don't have enough tokens to generate video",
      };
    }
    console.log({ userLimit });

    // generate video with replicate
    // const model = new Replicate({
    //   model:
    //     "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
    //   apiKey: process.env.REPLICATE_API_KEY,
    //   input: {
    //     fps: 24,
    //     model: "xl",
    //     width: 1024,
    //     height: 576,
    //     Prompt: prompt,
    //     batch_size: 1,
    //     num_frames: 24,
    //     init_weight: 0.5,
    //     guidance_scale: 17.5,
    //     // "negative_prompt": "very blue, dust, noisy, washed out, ugly, distorted, broken",
    //     remove_watermark: false,
    //     num_inference_steps: 50,
    //   },
    // });

    // const res = await model.invoke(prompt);

    // update token usage
    console.log(userLimit - VIDEO_TOKEN_USAGE);
    await prismadb.tokenLimit.update({
      where: {
        userId,
      },
      data: {
        count: userLimit - VIDEO_TOKEN_USAGE,
      },
    });

    // update histrory
    await prismadb.history.create({
      data: {
        userId,
        content: `Generated video with prompt:  ${prompt.slice(0, 11)}...`,
      },
    });
    return { error: false, details: "res" };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
