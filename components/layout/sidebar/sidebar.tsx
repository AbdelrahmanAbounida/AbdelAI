import { SidebarItems } from "@/constants/nav";
import React from "react";
import SidebarLink from "./sidebar-item";
import LogoDark from "@/components/logo-dark";
import FreeGenerations from "./free-generations";

const Sidebar = () => {
  return (
    <aside>
      <div className="w-72 bg-[#131725] dark:bg-[#020817]  dark:border-r dark:border-slate-800  flex  justify-between flex-col fixed left-0 top-0 h-full ">
        <div className="flex flex-col gap-7 w-full ">
          <div className="mt-7 mb-5  flex items-center justify-center pr-4">
            <LogoDark />
          </div>
          <div className="pr-4 pl-2">
            <div className="flex flex-col gap-4 w-full ">
              {SidebarItems.map((item, index) => (
                <SidebarLink key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
        <FreeGenerations />
      </div>
    </aside>
  );
};

export default Sidebar;
