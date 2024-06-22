"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ReactAudioPlayer from "react-audio-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoadingButton from "../../_components/loading-button";
import EmptyState from "../../_components/empty-state";
import { toast } from "sonner";
import { generateVideo } from "@/actions/ai-services/video";

const VideoFormSchema = z.object({
  prompt: z.string().min(1, { message: "message is required" }),
});

const VideoGeneration = () => {
  const [generatedVideo, setgeneratedVideo] = useState<string>("");
  const [videoLoading, setvideoLoading] = useState(false);

  // form
  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
  });
  const errors = form.formState.errors;

  async function onSubmit(data: z.infer<typeof VideoFormSchema>) {
    try {
      setvideoLoading(true);
      setgeneratedVideo("");
      const resp = await generateVideo(data);
      if (resp?.error) {
        toast.error(resp?.details);
      } else {
        setgeneratedVideo(resp?.details[0]);
      }
      console.log({ resp });
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setvideoLoading(false);
    }
  }
  console.log({ generatedVideo });

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {/**  Video form  */}
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
                      placeholder="Clown fish swimming in a coral reef"
                      {...field}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            {videoLoading ? (
              <LoadingButton />
            ) : (
              <Button
                className="h-10 max-w-44 w-full bg-violet-600 hover:bg-violet-700 dark:text-white"
                type="submit"
              >
                Generate
              </Button>
            )}
          </form>
        </Form>

        <EmptyState
          show={generatedVideo.length == 0}
          generateLoading={videoLoading}
          title={"No Video generated"}
        />

        {/* <ReactPlayer
              controls
              style={{ aspectRatio: 16 / 9, border: 3, width: "100%" }}
              url={generatedVideo}
            /> */}
        {generatedVideo && (
          <video
            className="w-full aspect-video mt-8 rounded-lg border bg-black"
            controls
          >
            <source src={generatedVideo} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoGeneration;
