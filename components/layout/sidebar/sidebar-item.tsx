"use client";
import { Icons } from "@/constants/icons";
import { SideNavItemProps } from "@/constants/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item: SideNavItemProps;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, ...props }) => {
  const Icon = Icons[item.icon];
  const currentPath = usePathname();
  return (
    <Link
      href={item.link}
      className={cn(
        "w-full p-3 rounded-md gap-2 items-center flex hover:bg-[#2A2F3A] text-[#9396A2] hover:text-white/80",
        currentPath == item.link && "bg-zinc-700 text-white",
        props.className
      )}
    >
      {Icon && <Icon color={item.color} />}
      <span className=" ">{item.title}</span>
    </Link>
  );
};

export default SidebarLink;
