import { getUserHistory } from "@/actions/history/get-history";
import { getUserByEmail } from "@/actions/user/get-user";
import useSWR from "swr";
import { useCurrentUser } from "./useCurrentUser";

export const fetcher = async (email?: string) => {
  try {
    let email2 = email;
    if (!email) {
      const { user } = useCurrentUser();
      email2 = user?.email!;
    }
    const res = await getUserByEmail({ email: email2! });
    if (res?.error) {
      throw new Error(res?.details);
    }
    return res?.details;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const usePrismaUser = (email?: string) => {
  const { data, isLoading, error } = useSWR("getPrismaUser", () =>
    fetcher(email)
  );
  return { data, isLoading, error };
};
