"use server";

import { auth } from "@/auth";
import { BillingPlans } from "@/constants/pricing";
import { prismadb } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absolutePath } from "@/lib/utils";
import { ActionResponse } from "@/schemas/common";

// a method to create new session to reroute the user too in which we gonna handle subscriptions
// using the webhook
export const createSubscriptionSession = async ({
  planName,
}: {
  planName: keyof typeof BillingPlans;
}): Promise<ActionResponse> => {
  try {
    if (planName == "FREE") {
      return { error: false, details: "" }; // dont create  a session
    }

    const session = await auth();
    const user = session?.user;
    if (!user) {
      return { error: true, details: "You are not authorized" };
    }
    const user_sub = await prismadb.userSubscription.findUnique({
      where: {
        userId: user?.id,
      },
    });

    // 1- create sesssion
    const returnUrl = absolutePath(`/settings?tab=billings`);
    let url = "";

    // if we already have a subscription
    if (user_sub && user_sub.stripeCustomerId) {
      console.log({ user_sub });

      const stripe_session = await stripe.billingPortal.sessions.create({
        customer: user_sub.stripeCustomerId,
        return_url: returnUrl,
      });
      url = stripe_session.url;

      console.log({ stripe_session });
    } else {
      // create new subscription with session
      // TODO:: Create it according to plan

      const stripe_session = await stripe.checkout.sessions.create({
        // customer: stripe_customer?.id,
        mode: "subscription",
        payment_method_types: ["paypal", "card"],
        success_url: returnUrl,
        cancel_url: returnUrl,
        billing_address_collection: "auto",
        customer_email: user?.email!,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "USD",
              product_data: {
                name: planName,
                description: BillingPlans[planName].description,
              },
              unit_amount: Math.round(BillingPlans[planName].price * 100),
              recurring: {
                interval: "month",
              },
            },
          },
        ],
        metadata: {
          userId: user?.id,
          plan: planName,
        },
      });
      url = stripe_session.url!;
    }

    return { error: false, details: url };
  } catch (error) {
    console.log({ error });
    return { error: true, details: "Something went wrong" };
  }
};
