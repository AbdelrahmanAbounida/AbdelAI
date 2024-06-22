import type { Message } from "ai/react";
import React from "react";
import UserAvatar from "./user-avatar";
import LogoDark from "@/components/logo-dark";
import Highlight from "react-highlight";
import "highlight.js/styles/github.css";

function ChatMessageBubble(props: { message: Message; isCode: boolean }) {
  const colorClassName =
    props.message.role === "user" ? "bg-violet-50" : "bg-slate-50 text-black";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix =
    props.message.role === "user" ? (
      <UserAvatar />
    ) : (
      <LogoDark withTitle={false} className="h-6 w-6" />
    );

  function transformCodeBlock(input: string): string {
    const codeBlockPattern = /```([a-zA-Z0-9]+)\s*([\s\S]*?)\s*```/;
    const transformed = input.replace(
      codeBlockPattern,
      (match, language, code) => {
        return code.trim();
      }
    );
    return transformed;
  }

  return props.isCode ? (
    props.message.role !== "user" && (
      <div
        className={`w-full  h-full  flex items-center gap-2 min-h-12 justify-start ${colorClassName} mt-3 rounded px-4 pr-8 py-2  mb-8`}
      >
        <div className="mr-2">{prefix}</div>

        <Highlight className=" h-full w-full bg-slate-50">
          {transformCodeBlock(props.message.content)}
        </Highlight>
      </div>
    )
  ) : (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded px-4 pr-8 py-2 max-w-[80%] mb-8 flex`}
    >
      <div className="mr-2">{prefix}</div>
      <div className="whitespace-pre-wrap flex flex-col">
        <span>{props.message.content}</span>
      </div>
    </div>
  );
}

export default ChatMessageBubble;
