"use client";
import MultiStepBillingModal from "@/components/modals/payment-modal";
import UpgradeModal from "@/components/modals/upgrade-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  return (
    <>
      <UpgradeModal />
      <MultiStepBillingModal />
    </>
  );
};

export default ModalProvider;
