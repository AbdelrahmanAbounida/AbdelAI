"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import PricingTables from "@/components/pricing-tables";

export default function Home() {
  const [routeLoading, setrouteLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#131725] ">
      <div className="flex w-full flex-col gap-2  items-center justify-center">
        <h1 className="text-[60px] font-extrabold text-white">
          The Best AI Tool for
        </h1>
        <h3 className="text-[55px] font-extrabold text-pink-600">
          AI Services
        </h3>
        <h4 className="text-gray-400 text-[20px]">
          Create content using AI 10x faster with AbdelAI
        </h4>
        {routeLoading ? (
          <Button className="w-64 rounded-full bg-gray-800 p-4 mt-3" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Link
            onClick={() => setrouteLoading(true)}
            href={"/dashboard"}
            className={cn(
              "text-lg p-4 opacity-95 px-7 hover:opacity-100 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-3",
              !routeLoading && "bg-gray-700"
            )}
          >
            Start Generating For free
          </Link>
        )}
        <h4 className="text-gray-400 text-sm mt-3">No Credit card required</h4>
      </div>

      {/**
       *Pricing Tables
       */}
      <PricingTables />
    </main>
  );
}
