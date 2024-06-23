"use server";

import { prismadb } from "@/lib/db";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const validateSubscription = async ({
  userId,
}: {
  userId: string;
}): Promise<Boolean> => {
  const user_sub = await prismadb.userSubscription.findFirst({
    where: {
      userId,
    },
  });

  if (!user_sub) {
    return false;
  }

  const isValid =
    user_sub.stripePriceId &&
    user_sub.stripeEndDate?.getTime()! + DAY_IN_MS > Date.now();
  return !!isValid;
};

// ::TODO:: check sub
// ::TODO:: show upgrade in sidebar if user not pro
// see josh for stripe
// handle stripe on main page
// show uprade on sidebar for free users
// deploy

// work on gedanken webhook
// work on chris admin and check azure
// work on louis telegram
// finalize presentation
// finalize apolo certificate 3 courses
// finalize nest graphql
// electron course
// make electron notebook on mac
// check array on w3 scheeol
// read paper attention and implement with pytorch
// solve 10 leetcode problems
// strapi project
// jest in nextjs
