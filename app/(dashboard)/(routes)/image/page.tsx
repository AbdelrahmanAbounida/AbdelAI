"use client";
import React, { useState } from "react";
import PageHeader from "../../_components/page-header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

enum ImageSizeEnum {
  "256X256" = 256,
  "512X512" = 512,
  "1024X1024" = 1024,
}

const ImageFormSchema = z.object({
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

const ImageGeneration = () => {
  const [generatedImage, setgeneratedImage] = useState<string>("");

  // form
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      numImages: 1,
      imageSize: 256,
    },
  });
  const errors = form.formState.errors;

  function onSubmit(data: z.infer<typeof ImageFormSchema>) {
    console.log({ data });

    {
      /** ::TODO :: handle image generation and update db table  */
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {/** generate image form  */}
        {/** ::TODO:: Mobile design */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 shadow-sm border  flex items-center justify-between gap-3 mt-7 rounded-md w-full mx-auto"
          >
            {/** input */}
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className={cn(
                        "h-10 outline-none ring-0 min-w-40  shadow-none ",
                        errors.prompt && "border-red-500"
                      )}
                      placeholder="a flying horse.."
                      {...field}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            {/** image size */}
            <FormField
              control={form.control}
              name="imageSize"
              render={({ field }) => (
                <FormItem className="max-w-44 2xl:max-w-56 w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-10 ",
                          errors.imageSize && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Select image size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        className="text-sm"
                        value={ImageSizeEnum["256X256"].toString()}
                      >
                        256X256
                      </SelectItem>
                      <SelectItem value={ImageSizeEnum["512X512"].toString()}>
                        512X512
                      </SelectItem>
                      <SelectItem value={ImageSizeEnum["1024X1024"].toString()}>
                        1024X1024
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            {/** num of images */}
            <FormField
              control={form.control}
              name="numImages"
              render={({ field }) => (
                <FormItem className="max-w-44 2xl:max-w-56  w-full ">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-10 ",
                          errors.numImages && "border-red-500"
                        )}
                      >
                        <SelectValue
                          className=""
                          placeholder="Select num of images"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((item, index) => (
                        <SelectItem key={index} value={item.toString()}>
                          {item == 1 ? "1 photo" : `${item} photos`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <Button
              className="h-10 max-w-44 w-full bg-violet-600 hover:bg-violet-700"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="">{/** generate button */}</div>

        {/** empty result */}
        {!generatedImage && (
          <div className="h-full items-center justify-center mt-4 flex flex-col">
            <img src="/assets/empty-img.png" alt="empty image" />

            <span className="text-slate-600 text-md">No images generated</span>
          </div>
        )}

        {/** ::TODO:: Create image card and show final result */}
      </div>
    </div>
  );
};

export default ImageGeneration;
