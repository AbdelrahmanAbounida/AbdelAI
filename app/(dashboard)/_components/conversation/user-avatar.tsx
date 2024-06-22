"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

const UserAvatar = () => {
  const { user: currentUser } = useCurrentUser();
  return (
    <Avatar className="w-8 h-8">
      {currentUser?.image && <AvatarImage src={currentUser.image} />}
      <AvatarFallback>
        <span
          className={
            currentUser?.image
              ? ""
              : "bg-violet-500 w-full h-full text-center items-center justify-center flex font-medium text-white"
          }
        >
          {currentUser?.name || currentUser?.email?.slice(0, 2)}
        </span>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
