import { getUserHistory } from "@/actions/history/get-history";
import { getUserByEmail } from "@/actions/user/get-user";
import useSWR from "swr";

export const fetcher = async (email: string) => {
  try {
    const res = await getUserByEmail({ email });
    if (res?.error) {
      throw new Error(res?.details);
    }
    return res?.details;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const usePrismaUser = (email: string) => {
  const { data, isLoading, error } = useSWR("getPrismaUser", () =>
    fetcher(email)
  );
  return { data, isLoading, error };
};
