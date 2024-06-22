import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LogoDark = ({
  withTitle = true,
  className,
}: {
  withTitle?: boolean;
  className?: string;
}) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex items-center gap-2 mx-auto w-full  justify-center",
        className
      )}
    >
      <img
        width={50}
        className=""
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="abdelai"
      />
      {withTitle && (
        <div className="text-3xl font-bold text-white">AbdelAI</div>
      )}
    </Link>
  );
};

export default LogoDark;
