"use client";
import React from "react";
import ConversationBlock from "../../_components/conversation/conversation-block";

const CodeGeneration = () => {
  return (
    <div>
      <ConversationBlock isCode={true} />
    </div>
  );
};

export default CodeGeneration;
