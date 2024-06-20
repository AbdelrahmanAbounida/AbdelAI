import { create } from "zustand";

type PaymentStore = {
  paymentModalOpen: boolean;
  setPaymentModal: (newVal: boolean) => void;
};

export const usePayment = create<PaymentStore>((set) => ({
  paymentModalOpen: false,
  setPaymentModal(newVal) {
    set({
      paymentModalOpen: newVal,
    });
  },
}));
