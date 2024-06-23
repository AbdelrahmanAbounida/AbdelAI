import { BillingPlans } from "@/constants/pricing";

export interface ActionResponse {
  error: boolean;
  details: any;
}

export type BillingPlanType = keyof typeof BillingPlans;
