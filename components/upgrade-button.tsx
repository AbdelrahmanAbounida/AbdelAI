"use client";
import React from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const UpgradeButton = () => {
  const { setPaymentModal } = usePayment();

  {
    /** TODO: Upgrad efunctionality */
  }

  return (
    <Button
      onClick={() => setPaymentModal(true)}
      className="hover:opacity-100 dark:text-white opacity-95 w-full h-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      Upgrade
      <Zap className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default UpgradeButton;
