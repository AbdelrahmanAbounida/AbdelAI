"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePayment } from "@/hooks/usePayment";
import BillingView from "../billing/main";

const MultiStepBillingModal = () => {
  const { multistepModal, setMultistepModal } = usePayment();
  return (
    <Dialog
      open={multistepModal}
      onOpenChange={(newval) => setMultistepModal(newval)}
    >
      <DialogContent className=" min-w-[600px] min-h-[300px]">
        <BillingView />
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepBillingModal;
