"use client";
import { MAX_NUM_GENERATIONS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import UpgradeButton from "@/components/upgrade-button";

const FreeGenerations = () => {
  const currentGenerations = 2;
  return (
    <div className="p-3">
      <div className="w-full rounded-md bg-[#2A2F3A] dark:bg-slate-900 flex flex-col p-6 gap-2 items-center justify-center">
        {/** TODO:: add current num of generations  */}
        <h3 className="font-medium text-white">
          {currentGenerations}/{MAX_NUM_GENERATIONS} Free Generations
        </h3>
        <Progress
          style={{ color: "green" }}
          className="bg-white [&>*]:bg-[#8b5cf6]   h-3" // [#15701d]
          value={(currentGenerations * 100) / MAX_NUM_GENERATIONS}
        />

        <UpgradeButton />
      </div>
    </div>
  );
};

export default FreeGenerations;
