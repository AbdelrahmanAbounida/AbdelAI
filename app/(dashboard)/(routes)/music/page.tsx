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
import { generateMusic } from "@/actions/ai-services/music";

const MusicFormSchema = z.object({
  prompt: z.string().min(1, { message: "message is required" }),
});

const MusicGeneration = () => {
  const [generatedMusic, setgeneratedMusic] = useState<string>("");
  const [musicLoading, setmusicLoading] = useState(false);

  // form
  const form = useForm<z.infer<typeof MusicFormSchema>>({
    resolver: zodResolver(MusicFormSchema),
  });
  const errors = form.formState.errors;

  async function onSubmit(data: z.infer<typeof MusicFormSchema>) {
    try {
      setmusicLoading(true);
      setgeneratedMusic("");
      const resp = await generateMusic(data);
      if (resp?.error) {
        toast.error(resp?.details);
      } else {
        console.log({ resp });
        setgeneratedMusic(resp?.details?.audio);
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setmusicLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {/**  Music form  */}
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
                      placeholder="Piano Solo"
                      {...field}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            {musicLoading ? (
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
          show={generatedMusic.length == 0}
          generateLoading={musicLoading}
          title={"No Music generated"}
        />

        {generatedMusic && (
          <ReactAudioPlayer
            className="w-full mt-3"
            src={generatedMusic}
            autoPlay
            controls
          />
        )}
      </div>
    </div>
  );
};

export default MusicGeneration;
