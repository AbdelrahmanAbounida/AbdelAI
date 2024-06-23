import { FREE_PLAN_INIT_TOKENS } from "@/constants";
import { BillingPlans } from "@/constants/pricing";
import { prismadb } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { BillingPlanType } from "@/schemas/common";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    const session = event.data.object as any; // Stripe.PaymentIntent
    const userId = session.metadata?.userId;
    const email = session.metadata?.email;
    const name = session.metadata?.name;
    const plan = session.metadata?.plan as BillingPlanType;

    if (!userId) {
      return NextResponse.json(
        { error: "webhook error missing  userId" },
        { status: 400 }
      );
    }

    // no action to take
    if (event.type === "payment_intent.created") {
      return new NextResponse(null, { status: 200 });
    }

    // this is the first time i get user payment
    if (event.type === "charge.succeeded") {
      // 1- create customer
      let customer;
      if (!session.customer) {
        customer = await stripe.customers.create({
          email: email!,
          name: name!,
          metadata: { userId },
        });
      } else {
        customer = await stripe.customers.retrieve(session.customer as string);
      }

      // Create a subscription
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

      // update user subscription
      const newWssub = await prismadb.userSubscription.upsert({
        where: {
          userId: userId,
        },
        create: {
          userId: userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeEndDate: new Date(subscription.current_period_end * 1000),
        },
        update: {
          userId: userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeEndDate: new Date(subscription.current_period_end * 1000),
        },
      });

      // update user tokens
      await prismadb.tokenLimit.upsert({
        where: {
          userId: userId,
        },
        create: {
          userId: userId,
          count: FREE_PLAN_INIT_TOKENS + BillingPlans[plan].tokens,
        },
        update: {
          count: {
            increment: BillingPlans[plan].tokens,
          },
        },
      });
      // update user plan and total tokens
      const newUser = await prismadb.user.update({
        where: {
          id: userId,
        },
        data: {
          plan,
          totalTokens: {
            increment: BillingPlans[plan].tokens,
          },
        },
      });
    }

    // this event should be every month
    if (event.type === "payment_intent.succeeded") {
      // Retrieve the subscription related to the payment intent
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const subscriptionId = paymentIntent.metadata?.subscriptionId;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        // Upsert user subscription details
        const newWssub = await prismadb.userSubscription.upsert({
          where: {
            userId: userId,
          },
          create: {
            userId: userId,
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeEndDate: new Date(subscription.current_period_end * 1000),
          },
          update: {
            userId: userId,
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeEndDate: new Date(subscription.current_period_end * 1000),
          },
        });

        // Update user tokens
        await prismadb.tokenLimit.upsert({
          where: {
            userId: userId,
          },
          create: {
            userId: userId,
            count: FREE_PLAN_INIT_TOKENS,
          },
          update: {
            count: {
              increment: BillingPlans[plan].tokens,
            },
          },
        });

        // Update user plan
        const newUser = await prismadb.user.update({
          where: {
            id: userId,
          },
          data: {
            plan,
          },
        });

        console.log({ newUser });
      }
    } else {
      return NextResponse.json(
        { error: "Webhook error: unhandled event" },
        { status: 200 }
      );
    }
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
