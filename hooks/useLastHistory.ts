import { getUserHistory } from "@/actions/history/get-history";
import useSWR from "swr";

export const fetcher = async () => {
  try {
    const res = await getUserHistory();
    if (res?.error) {
      throw new Error(res?.details);
    }
    return res?.details;
  } catch (error) {
    throw new Error("something went wrong");
  }
};

export const useLastHistory = () => {
  const { data, isLoading, error } = useSWR("getUserHistory", fetcher);
  return { data, isLoading, error };
};
