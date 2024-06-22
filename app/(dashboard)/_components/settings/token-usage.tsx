"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTokens } from "@/hooks/useTokens";
import React from "react";

const TokenUsage = () => {
  const { data, isLoading } = useTokens();

  if (isLoading) {
    return <TokenSkeleton />;
  }
  return (
    <div className="text-xl">
      you have{" "}
      <span className="font-bold text-2xl text-violet-500">{data?.count}</span>{" "}
      in your pocket
    </div>
  );
};

export default TokenUsage;

const TokenSkeleton = () => (
  <div className="">
    <Skeleton className="w-full h-7" />
  </div>
);
