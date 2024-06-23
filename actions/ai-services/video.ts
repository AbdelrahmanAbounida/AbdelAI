"use server";

import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { VIDEO_TOKEN_USAGE } from "@/constants";
import Replicate from "replicate";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";
import { getUserById } from "../user/get-user";

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
    const user_res = await getUserById({ id: userId });
    const user = user_res?.details;
    if (user_res?.error || !user_res?.details) {
      return { error: true, details: "unauthorized" };
    }

    if (!user.replicate_api_key) {
      return {
        error: true,
        details:
          "Please update your profile replicate_api_key first in settings",
      };
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

    const replicate = new Replicate({
      auth: user.replicate_api_key, // process.env.REPLICATE_API_KEY,
    });
    const model =
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351";

    const res = await replicate.run(model, {
      input: {
        fps: 24,
        model: "xl",
        width: 576,
        height: 576,
        prompt: prompt,
        batch_size: 1,
        num_frames: 24,
        init_weight: 0.5,
        guidance_scale: 17.5,
        negative_prompt:
          "very blue, dust, noisy, washed out, ugly, distorted, broken",
        remove_watermark: false,
        num_inference_steps: 50,
      },
    });

    // update token usage
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
    return { error: false, details: res };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
