import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const LoadingButton = () => {
  return (
    <Button disabled className="bg-violet-600 max-w-44 w-full h-10">
      {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
      Loading...
    </Button>
  );
};

export default LoadingButton;
