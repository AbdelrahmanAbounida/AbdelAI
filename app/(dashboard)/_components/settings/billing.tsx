"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BillingView from "@/components/billing/main";
import { usePrismaUser } from "@/hooks/useCurrentPrismaUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Billing = () => {
  const { user } = useCurrentUser();
  const { data: prismaUser, isLoading } = usePrismaUser(user?.email!);

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <Skeleton className="h-10 w-[150px]" />
      ) : (
        <h1 className="text-lg font-medium">
          You are currently on{" "}
          <span className="text-green-600 font-bold">{prismaUser?.plan}</span>{" "}
          Plan
        </h1>
      )}

      <Tabs defaultValue="billing" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="billing">Billing </TabsTrigger>
          <TabsTrigger value="manage_sub">Manage Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="billing">
          <BillingView />
        </TabsContent>
        <TabsContent value="manage_sub">Basic Plan</TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
