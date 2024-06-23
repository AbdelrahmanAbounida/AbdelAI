"use client";
import { MAX_NUM_GENERATIONS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import UpgradeButton from "@/components/upgrade-button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePrismaUser } from "@/hooks/useCurrentPrismaUser";
import { Skeleton } from "@/components/ui/skeleton";

const FreeGenerations = () => {
  const { user: currentUser } = useCurrentUser();
  const { data: prismaUser, isLoading } = usePrismaUser(currentUser?.email!);

  // const currentGenerations = currentUser?.tokens;

  if (currentUser?.plan !== "FREE") {
    return;
  }

  if (isLoading) {
    return <FreeGenerationsSkeleton />;
  }
  return (
    <div className="p-3">
      <div className="w-full rounded-md bg-[#2A2F3A] dark:bg-slate-900 flex flex-col p-6 gap-2 items-center justify-center">
        {/** TODO:: add current num of generations  */}
        <h3 className="font-medium text-white">
          {35 - prismaUser?.totalTokens}/{MAX_NUM_GENERATIONS} Free Generations
        </h3>
        <Progress
          style={{ color: "green" }}
          className="bg-white [&>*]:bg-[#8b5cf6]   h-3" // [#15701d]
          value={((35 - prismaUser?.totalTokens!) * 100) / MAX_NUM_GENERATIONS}
        />

        <UpgradeButton />
      </div>
    </div>
  );
};

export default FreeGenerations;

const FreeGenerationsSkeleton = () => (
  <div className="p-4 w-full ">
    <Skeleton className="h-5 z-100 w-[100px]" />
    <Skeleton className="h-4 w-full" />

    <Skeleton className="h-10 w-full" />
  </div>
);
