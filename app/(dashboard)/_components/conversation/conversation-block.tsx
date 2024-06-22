"use client";

import { useChat } from "ai/react";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import ChatMessageBubble from "./chat-message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import LoadingButton from "../loading-button";
import EmptyState from "../empty-state";
import { Trash } from "lucide-react";
import { addHistory } from "@/actions/history/add-history";
import { updateTokenLimit } from "@/actions/token-limit/update-tokens";
import { CODE_TOKEN_USAGE, TEXT_TOKEN_USAGE } from "@/constants";
import { CheckTokenLimit } from "@/actions/token-limit/get-tokens";

const ConversationFormSchema = z.object({
  prompt: z.string().min(1, { message: "message is required" }),
});

export function ConversationBlock({ isCode }: { isCode: boolean }) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Form
  const form = useForm<z.infer<typeof ConversationFormSchema>>({
    resolver: zodResolver(ConversationFormSchema),
  });
  const errors = form.formState.errors;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: isCode ? "/api/code" : "api/chat",
    onResponse(response: any) {
      if (response.status == 200) {
        // update token usage
        updateTokensAndhistory();
      }
    },
    streamMode: "text",
    onError: (e: any) => {
      toast(e?.message?.error);
    },
  });

  const updateTokensAndhistory = async () => {
    try {
      const res2 = await updateTokenLimit(
        isCode ? CODE_TOKEN_USAGE : TEXT_TOKEN_USAGE
      );
      if (res2?.error) {
        toast.error(res2?.details);
      }
      // update histrory
      const res3 = await addHistory(
        `Generated new code for question: ${input?.slice(0, 15)}... `
      );
      if (res3?.error) {
        toast.error(res3?.details);
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    }
  };

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow");
    }
    // check token limit here
    const res = await CheckTokenLimit(
      isCode ? CODE_TOKEN_USAGE : TEXT_TOKEN_USAGE
    );
    if (res?.error) {
      toast.error(res?.details);
    }

    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }
    handleSubmit(e);
  }

  // function onSubmit(data: z.infer<typeof ConversationFormSchema>) {

  // }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={sendMessage} // {form.handleSubmit(onSubmit)}
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
                    value={input}
                    onChange={handleInputChange}
                    className={cn(
                      "h-10 outline-none ring-0  shadow-none ",
                      errors.prompt && "border-red-500"
                    )}
                    placeholder="What is the best touristic place to visit in 2024 ? "
                    // {...field}
                  />
                </FormControl>

                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {chatEndpointIsLoading ? (
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

      <div
        className={`flex flex-col items-center p-4 md:p-8 rounded grow overflow-hidden `}
      >
        {messages.length > 0 && (
          <div className="ml-auto w-full">
            <Button
              onClick={() => setMessages([])}
              className="active:translate-y-[1px]"
              disabled={chatEndpointIsLoading}
              variant="destructive"
              size={"sm"}
            >
              <Trash color="white" className="w-4 h-4 mr-2" />
              clear chat
            </Button>
          </div>
        )}
        <div
          className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out"
          ref={messageContainerRef}
        >
          {/** empty result */}
          <EmptyState
            show={messages?.length == 0}
            generateLoading={chatEndpointIsLoading}
            title="No Answer Generated"
          />

          {messages.length > 0 ? (
            isCode ? (
              [...messages].reverse().map((m, i) => {
                return (
                  <ChatMessageBubble
                    isCode={isCode}
                    key={m.id}
                    message={m}
                  ></ChatMessageBubble>
                );
              })
            ) : (
              <ChatMessageBubble
                isCode={isCode}
                message={messages[messages.length - 1]}
              ></ChatMessageBubble>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default ConversationBlock;
