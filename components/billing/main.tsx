"use client ";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PaymentView from "@/components/billing/payment-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BillingPlanType } from "@/schemas/common";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/usePayment";
import PlanForm from "./plans-view";
import { createPaymentIntent } from "@/actions/checkout/payment-intent";
import { toast } from "sonner";
import Stripe from "stripe";

const BillingView = () => {
  const { user } = useCurrentUser();
  const [secertLoading, setsecertLoading] = useState(false);
  const {
    currentStep,
    setCurrentStep,
    currentPlan,
    setCurrentPlan,
    clientSecret,
    setClientSecret,
  } = usePayment();

  useEffect(() => {
    setCurrentPlan(user?.plan!);
  }, [user]);

  const handleNextStep = async () => {
    // 1- create client secret according to current plan
    if (currentStep == 0 && !clientSecret) {
      // update current step
      setCurrentStep(currentStep + 1);
      try {
        setsecertLoading(true);
        const resp = await createPaymentIntent({ plan: currentPlan });
        if (resp?.error) {
          toast.error(resp?.details);
        } else {
          const paymentIntent: Stripe.PaymentIntent = resp?.details;
          console.log({ paymentIntent });
          if (!paymentIntent.client_secret) {
            toast.error("Failed to load payment view");
            return;
          }
          setClientSecret(paymentIntent.client_secret);
        }
      } catch (error) {
        console.log({ error });
        toast.error("Something went wrong");
      } finally {
        setsecertLoading(false);
      }
    }
  };

  return (
    <div>
      <div>{currentStep === 0 && <PlanForm />}</div>

      <div>
        {currentStep === 1 &&
          (secertLoading || !clientSecret ? (
            <Skeleton className="w-full h-10" />
          ) : (
            <PaymentView />
          ))}
      </div>

      <div className="w-full items-center flex justify-between mt-4 ">
        {currentStep == 0 && (
          <Button
            onClick={handleNextStep}
            disabled={currentPlan == user?.plan}
            type="submit"
            className="relative text-neutral-200 bg-violet-700 hover:bg-violet-600 border border-black/20  shadow-black/10 px-6 hover:text-white"
          >
            select Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingView;
