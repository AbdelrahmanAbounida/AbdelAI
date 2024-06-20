"use client";
import { MAX_NUM_GENERATIONS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const FreeGenerations = () => {
  const currentGenerations = 2;
  return (
    <div className="p-3">
      <div className="w-full rounded-md bg-[#2A2F3A] flex flex-col p-6 gap-2 items-center justify-center">
        {/** TODO:: add current num of generations  */}
        <h3 className="font-medium text-white">
          {currentGenerations}/{MAX_NUM_GENERATIONS} Free Generations
        </h3>
        <Progress
          style={{ color: "green" }}
          className="bg-white [&>*]:bg-[#8b5cf6]   h-3" // [#15701d]
          value={(currentGenerations * 100) / MAX_NUM_GENERATIONS}
        />

        {/** TODO: Upgrad efunctionality */}
        <Button className="hover:opacity-100 opacity-95 w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Upgrade
          <Zap className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FreeGenerations;
