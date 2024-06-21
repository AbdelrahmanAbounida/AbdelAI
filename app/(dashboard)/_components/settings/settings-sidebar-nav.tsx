"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { SettingsSidebarNavItems } from "@/constants/settings";
import { useSettings } from "@/hooks/useSettings";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    description: string;
    title: string;
  }[];
}

export function SettingsSidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const { currentActiveTab, setCurrentActiveTab } = useSettings();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Button
          onClick={() => setCurrentActiveTab(item)}
          key={index}
          variant={"ghost"}
          className={cn(
            currentActiveTab.title === item.title
              ? "bg-muted hover:bg-muted"
              : "underline-none ",
            "justify-start"
          )}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
