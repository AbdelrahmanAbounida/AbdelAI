import { getUserTokens } from "@/actions/token-limit/get-tokens";
import useSWR from "swr";

const fetcher = async () => {
  try {
    const res = await getUserTokens();
    if (res?.error) {
      throw new Error(res?.details);
    }
    return res?.details;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const useTokens = () => {
  const { data, isLoading, error } = useSWR("getAllTokens", fetcher);
  return { data, isLoading, error };
};
