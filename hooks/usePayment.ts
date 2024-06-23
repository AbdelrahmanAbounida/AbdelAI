import { BillingPlanType } from "@/schemas/common";
import { create } from "zustand";

type PaymentStore = {
  paymentModalOpen: boolean;
  setPaymentModal: (newVal: boolean) => void;

  // multistep
  multistepModal: boolean;
  setMultistepModal: (newVal: boolean) => void;

  // current plan, step
  currentStep: number;
  setCurrentStep: (newStep: number) => void;

  currentPlan: BillingPlanType;
  setCurrentPlan: (newPlan: BillingPlanType) => void;

  clientSecret: string;
  setClientSecret: (newSec: string) => void;
};

export const usePayment = create<PaymentStore>((set) => ({
  paymentModalOpen: false,
  setPaymentModal(newVal) {
    set({
      paymentModalOpen: newVal,
    });
  },
  multistepModal: false,
  setMultistepModal(newVal) {
    set({
      multistepModal: newVal,
    });
  },

  currentStep: 0,
  setCurrentStep(newStep) {
    set({ currentStep: newStep });
  },
  currentPlan: "FREE",
  setCurrentPlan(newPlan) {
    set({ currentPlan: newPlan });
  },
  clientSecret: "",
  setClientSecret(newSec) {
    set({ clientSecret: newSec });
  },
}));
