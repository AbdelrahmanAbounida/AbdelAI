"use client";
import { Icons } from "@/constants/icons";
import { SidebarItems } from "@/constants/nav";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";

const PageHeader = () => {
  const currentPath = usePathname();
  const { theme } = useTheme();
  const navItem = SidebarItems.find((item) => item.link == currentPath);
  const Icon = navItem?.icon ? Icons[navItem?.icon] : null;

  if (currentPath == "/dashboard") {
    return;
  }

  return (
    <div className="flex items-center gap-3  ">
      {Icon && (
        <div
          style={{
            backgroundColor:
              theme == "dark" ? navItem?.darkBgColor : navItem?.bgColor,
          }}
          className={`flex items-center justify-center dark:bg-slate-900 w-[60px] h-[60px]  p-1 rounded-md`}
        >
          <Icon color={navItem?.color} size={50} />
        </div>
      )}
      <div className="flex flex-col gap-0 items-start justify-center mt-1">
        <span className="text-3xl font-bold ">{navItem?.title}</span>
        <span className="text-md text-zinc-500">{navItem?.description}</span>
      </div>
    </div>
  );
};

export default PageHeader;
