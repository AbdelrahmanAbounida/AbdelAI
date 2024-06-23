"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TbCircleLetterBFilled, TbCircleLetterPFilled } from "react-icons/tb";
import { BillingPlanType } from "@/schemas/common";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { usePayment } from "@/hooks/usePayment";
import { motion } from "framer-motion";

type Plan = BillingPlanType;

const formVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      ease: "easeOut",
    },
  },
};
// create client secret from payment intent
const PlanForm = () => {
  const { currentPlan, setCurrentPlan } = usePayment();
  const [planSelected, setPlanSelected] = useState<Plan>(currentPlan);
  const { user: currentUser } = useCurrentUser();

  const handleValueChange = (planSelected: Plan) => {
    if (planSelected) {
      setPlanSelected(planSelected);
      setCurrentPlan(planSelected);
    }
    // create payment intent and update client secret
  };

  return (
    <motion.div
      className="flex flex-col gap-5 "
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ToggleGroup
        orientation="horizontal"
        className="flex flex-col gap-3 my-2 md:flex-row md:items-center md:justify-between md:gap-0 "
        type="single"
        value={planSelected}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem
          value="BASIC"
          key="BASIC"
          className={cn(
            "border dark:data-[state=on]:bg-slate-900 border-gray-200 flex items-start gap-3 p-3 h-24 rounded-md aspect-square outline-none  md:h-44 md:w-[45%] md:flex-col md:justify-between md:gap-0",
            currentUser?.plan == "BASIC" && "bg-slate-200 dark:bg-slate-900"
          )}
        >
          <div className="w-full flex flex-col items-center justify-between gap-9">
            <TbCircleLetterBFilled size={50} fill="#7c3aed" />
            <div className="relative -top-1 flex flex-col items-center md:top-0">
              <p className="text-md text-gray-500">{"$20/mo"}</p>
              <p className="dark:text-white font-bold text-xl">Basic Plan</p>
            </div>
          </div>
        </ToggleGroupItem>

        <ToggleGroupItem
          className={cn(
            "border dark:data-[state=on]:bg-slate-900 border-gray-200 flex items-start gap-3 p-3 h-24 rounded-md aspect-square outline-none  md:h-44 md:w-[45%] md:flex-col md:justify-between md:gap-0",
            currentUser?.plan == "PRO" && "bg-slate-200 dark:bg-slate-900"
          )} // hover:border-violet-700 data-[state=on]:border-violet-700  focus:border-violet-700
          value="PRO"
          key="PRO"
        >
          <div className="w-full flex flex-col items-center justify-between gap-9">
            <TbCircleLetterPFilled size={50} fill="#7c3aed" />
            <div className="relative -top-1 flex flex-col items-center  md:top-0">
              <p className="text-md text-gray-500">{"$50/mo"}</p>
              <p className="dark:text-white font-bold text-xl">Pro Plan</p>
            </div>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};

export default PlanForm;
