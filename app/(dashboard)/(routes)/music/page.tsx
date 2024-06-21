"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MusicFormSchema = z.object({
  prompt: z.string().min(1, { message: "message is required" }),
});

const MusicGeneration = () => {
  const [generatedAnswer, setgeneratedAnswer] = useState<string>("");

  // form
  const form = useForm<z.infer<typeof MusicFormSchema>>({
    resolver: zodResolver(MusicFormSchema),
  });
  const errors = form.formState.errors;

  function onSubmit(data: z.infer<typeof MusicFormSchema>) {
    console.log({ data });

    {
      /** ::TODO :: handle Music generation and update db table  */
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

            <Button
              className="h-10 max-w-44 w-full bg-violet-600 hover:bg-violet-700 dark:text-white"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="">{/** generate button */}</div>

        {/** empty result */}
        {!generatedAnswer && (
          <div className="h-full items-center justify-center mt-4 flex flex-col">
            <img src="/assets/empty-img.png" alt="empty answer" />

            <span className="text-slate-600 text-md">No Music generated</span>
          </div>
        )}

        {/** ::TODO:: Create Music card and show final result */}
      </div>
    </div>
  );
};

export default MusicGeneration;
