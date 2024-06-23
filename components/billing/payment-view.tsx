"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { usePayment } from "@/hooks/usePayment";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const appearance = {
  theme: "stripe",
  variables: {
    // colorBackground: "#f675ff",
    // colorText: "#7c3aed",
  },
};

export default function PaymentView() {
  const { clientSecret } = usePayment();

  return (
    clientSecret && (
      <Elements
        options={{ clientSecret, ...appearance }}
        stripe={stripePromise}
      >
        <CheckoutForm />
      </Elements>
    )
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const options = {};

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=billings`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {message && <div id="payment-message">{message}</div>}
        </CardHeader>
        <CardContent>
          <PaymentElement
            options={{
              layout: {
                type: "tabs",
                defaultCollapsed: true,
              },
            }}
          />
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2 mt-5">
          {/* <Button onClick={previousStep} type="button" variant="secondary">
            Go Back
          </Button> */}

          <Button
            id="submit"
            className=" bg-violet-700 hover:bg-violet-600 w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
