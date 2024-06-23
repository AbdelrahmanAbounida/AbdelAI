export const FREE_TABLE = [
  "35 connects trial",
  "15 connects per video",
  "10 connects per music",
  "5 connects per image",
  "2 connects per code",
  "1 connect per text message",
];

export const BASIC_TABLE = [
  "Everything in Free Plan",
  "350 connects every month",
];

export const PRO_TABLE = [
  "Everything in Free Plan",
  "1000 connects every month",
];

export const BillingPlans = {
  FREE: {
    description: "35 connects trial",
    price: 0,
    tokens: 35,
    priceId: "",
  },
  BASIC: {
    description: "350 connects every month",
    price: 20,
    tokens: 350,
    priceId: "price_1PUtl6BmL6WTRBtCltTQC1vy",
  },
  PRO: {
    description: "1000 connects every month",
    price: 50,
    tokens: 1000,
    priceId: "price_1PUtldBmL6WTRBtCGpqjk7Gg",
  },
};
