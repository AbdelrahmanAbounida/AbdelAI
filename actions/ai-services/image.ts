"use server";
import { auth } from "@/auth";
import { getUserTokens } from "../token-limit/get-tokens";
import { FREE_PLAN_INIT_TOKENS, IMAGE_TOKEN_USAGE } from "@/constants";
import { Replicate } from "@langchain/community/llms/replicate";
import { ImageFormSchema } from "@/schemas/ai-services";
import { z } from "zod";
import { prismadb } from "@/lib/db";
import { ActionResponse } from "@/schemas/common";
import { FREE_TABLE } from "@/constants/pricing";

export const generateImage = async ({
  imageSize,
  numImages,
  prompt,
}: z.infer<typeof ImageFormSchema>): Promise<ActionResponse> => {
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

    if (!userLimit || userLimit < IMAGE_TOKEN_USAGE * numImages) {
      return {
        error: true,
        details: "You don't have enough tokens to generate image",
      };
    }

    // generate image with replicate
    const model = new Replicate({
      model:
        "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      // "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      apiKey: process.env.REPLICATE_API_KEY,
      input: {
        width: imageSize,
        height: imageSize,
        prompt,
        num_outputs: numImages,
        guidance_scale: 0,
        negative_prompt: "worst quality, low quality",
        num_inference_steps: 4,
        cfg: 1,
      },
    });

    const res = await model.invoke(prompt);

    // update token usage
    await prismadb.tokenLimit.upsert({
      where: {
        userId,
      },
      update: {
        count: userLimit - IMAGE_TOKEN_USAGE * numImages,
      },
      create: {
        userId,
        count: FREE_PLAN_INIT_TOKENS,
      },
    });

    // update histrory
    await prismadb.history.create({
      data: {
        userId,
        content: `Generated ${numImages} images with resolution ${imageSize}x${imageSize} `,
      },
    });

    const urlParts: string[] = res.split("https://");
    const imageUrls: string[] = urlParts
      .filter((part) => part)
      .map((part) => "https://" + part);

    return { error: false, details: imageUrls };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
