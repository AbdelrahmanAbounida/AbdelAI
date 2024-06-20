"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const VideoFormSchema = z.object({
  prompt: z.string().min(3, { message: "Video description is required" }),
});

const VideoGeneration = () => {
  const [generatedVideo, setgeneratedVideo] = useState<string>("");

  // form
  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
  });
  const errors = form.formState.errors;

  function onSubmit(data: z.infer<typeof VideoFormSchema>) {
    console.log({ data });

    {
      /** ::TODO :: handle video generation and update db table  */
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {/** generate video form  */}
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
                        "h-10 outline-none ring-0  shadow-none ",
                        errors.prompt && "border-red-500"
                      )}
                      placeholder="a flying horse under the see .."
                      {...field}
                    />
                  </FormControl>

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
        {!generatedVideo && (
          <div className="h-full items-center justify-center mt-4 flex flex-col">
            <img src="/assets/empty-img.png" alt="empty video" />

            <span className="text-slate-600 text-md">
              No video files generated
            </span>
          </div>
        )}

        {/** ::TODO:: Create video card and show final result */}
      </div>
    </div>
  );
};

export default VideoGeneration;
