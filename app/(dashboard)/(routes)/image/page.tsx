"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { ImageFormSchema, ImageSizeEnum } from "@/schemas/ai-services";
import { generateImage } from "@/actions/ai-services/image";
import LoadingButton from "../../_components/loading-button";
import ImageCard from "../../_components/image-card";
import { Loader2 } from "lucide-react";

const ImageGeneration = () => {
  const [generatedImages, setgeneratedImages] = useState<string[]>([]);
  const [generateLoading, setgenerateLoading] = useState(false);

  // form
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      numImages: 1,
      imageSize: 256,
    },
  });
  const errors = form.formState.errors;

  async function onSubmit(data: z.infer<typeof ImageFormSchema>) {
    try {
      setgenerateLoading(true);
      setgeneratedImages([]);
      const resp = await generateImage(data);
      if (resp?.error) {
        toast.error(resp?.details);
      } else {
        console.log({ resp });
        const images = resp?.details;
        console.log({ images });
        setgeneratedImages(resp?.details);
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setgenerateLoading(false);
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

            {generateLoading ? (
              <LoadingButton />
            ) : (
              <Button
                className="h-10 max-w-44 w-full bg-violet-600 hover:bg-violet-700 text-white"
                type="submit"
              >
                Generate
              </Button>
            )}
          </form>
        </Form>

        {/** empty result */}
        {generatedImages?.length == 0 && !generateLoading && (
          <div className="h-full items-center justify-center mt-4 flex flex-col">
            <img src="/assets/empty-img.png" alt="empty image" />

            <span className="text-slate-600 text-md">No images generated</span>
          </div>
        )}

        {generateLoading && (
          <div className="flex items-center justify-center h-52">
            <Loader2 className="animate-spin w-8 h-8" color="#7C3AED" />
          </div>
        )}

        {/** ::TODO:: Create image card and show final result */}
        <div className="w-full px-2 flex flex-wrap gap-4 items-center h-full justify-center">
          {generatedImages?.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
