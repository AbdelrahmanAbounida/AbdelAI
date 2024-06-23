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

// this is for subscription
export const createSubscription = async ({
  plan,
}: {
  plan: BillingPlanType;
}): Promise<ActionResponse> => {
  try {
    const session = await auth();

    const user = session?.user;
    const userId = user?.id;

    if (!userId) {
      return { error: true, details: "unauthorized" };
    }

    // 1- create customer
    const customer = await stripe.customers.create({
      email: user?.email!,
      name: user?.name!,
    });

    // 2- create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: BillingPlans[plan].priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    // 3- create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: BillingPlans[plan].price * 100,
      currency: "USD",
      metadata: {
        userId,
        plan,
        customerId: customer.id,
        subscriptionId: subscription.id,
      },
    });

    return { error: false, details: paymentIntent };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "something went wrong" };
  }
};
