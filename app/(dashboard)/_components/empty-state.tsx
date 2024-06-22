import { Loader2 } from "lucide-react";
import React from "react";

const EmptyState = ({
  generateLoading,
  show,
}: {
  generateLoading: boolean;
  show: boolean;
}) => {
  return (
    <>
      {show && !generateLoading && (
        <div className="h-full items-center justify-center mt-4 flex flex-col">
          <img src="/assets/empty-img.png" alt="empty image" />

          <span className="text-slate-600 text-md">No images generated</span>
        </div>
      )}

      {generateLoading && (
        <div className="flex items-center justify-center h-52">
          <Loader2 className="animate-spin w-8 h-8" color="#7C3AED" />
        </div>
      )}
    </>
  );
};

export default EmptyState;
