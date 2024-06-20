"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { logout } from "@/actions/auth/logout";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileDropdown = () => {
  const { user: currentUser, status } = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {status == "loading" ? (
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
        ) : (
          <Avatar>
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
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{currentUser?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
