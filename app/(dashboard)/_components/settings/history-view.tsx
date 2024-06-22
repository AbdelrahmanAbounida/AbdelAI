"use client";
import React from "react";
import { formatRelative } from "date-fns";
import { isValidDate } from "@/lib/format";
import { useLastHistory } from "@/hooks/useLastHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "@prisma/client";

const HistoryPage = () => {
  const { data, isLoading }: { data: History[]; isLoading: boolean } =
    useLastHistory();

  return isLoading ? (
    <HistorySkeleton />
  ) : (
    <div className="flex flex-col gap-3 items-center">
      {data.length == 0 && <div className=""> no activities recorded yet </div>}
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div
            key={index}
            className="flex w-full min-h-12 bg-slate-50 dark:bg-slate-900  p-2 items-center "
          >
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-white/70">
                  {item?.content}
                </span>
              </div>
              <div className="text-gray-500/80 dark:text-white/50">
                {isValidDate(item?.createdAt!) &&
                  formatRelative(item?.createdAt!, new Date())}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HistoryPage;

const HistorySkeleton = () =>
  [1, 2, 3, 5].map((item) => <Skeleton className="w-full h-12" />);
