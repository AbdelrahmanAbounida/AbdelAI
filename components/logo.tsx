import { Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({ withTitle = true }: { withTitle?: boolean }) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 mx-auto w-full  justify-center"
    >
      <Sparkle className="h-5 w-5 text-indigo-600" />
      {withTitle && (
        <div className="text-2xl font-bold text-indigo-600">AbdelAI</div>
      )}
    </Link>
  );
};

export default Logo;
