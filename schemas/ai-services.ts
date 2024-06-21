import { z } from "zod";

// image
export enum ImageSizeEnum {
  "256X256" = 256,
  "512X512" = 512,
  "1024X1024" = 1024,
}

export const ImageFormSchema = z.object({
  prompt: z.string().min(1, { message: "Image description is required" }),
  numImages: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(1).max(5)
  ),
  imageSize: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.nativeEnum(ImageSizeEnum)
  ),
});
