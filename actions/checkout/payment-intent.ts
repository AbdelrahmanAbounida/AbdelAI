"use server";

import { auth } from "@/auth";
import { BillingPlans } from "@/constants/pricing";
import { stripe } from "@/lib/stripe";
import { ActionResponse, BillingPlanType } from "@/schemas/common";

/**
 *https://docs.stripe.com/billing/subscriptions/build-subscriptions?platform=web&ui=elements#how-to-model-it-on-stripe
 * @param price: price in dollars
 * @returns
 */

// this is for one time payment
export const createPaymentIntent = async ({
  plan,
}: {
  plan: BillingPlanType;
}): Promise<ActionResponse> => {
  try {
    const session = await auth();

    const userId = session?.user.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: BillingPlans[plan].price * 100,
      currency: "USD",
      payment_method_types: ["card"],
      off_session: false,
      metadata: {
        userId,
        plan,
        email: session.user.email!,
        name: session.user.name!,
      },
    });

    return { error: false, details: paymentIntent };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
