import Link from "next/link";
import React from "react";

const Logo = ({ withTitle = true }: { withTitle?: boolean }) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 mx-auto w-full  justify-center"
    >
      <img
        width={50}
        className=""
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="abdelai"
      />

      {withTitle && (
        <div className="text-2xl font-bold text-indigo-600">AbdelAI</div>
      )}
    </Link>
  );
};

export default Logo;
