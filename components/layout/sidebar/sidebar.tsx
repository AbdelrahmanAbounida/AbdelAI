import { SidebarItems } from "@/constants/nav";
import React from "react";
import SidebarLink from "./sidebar-item";
import Logo from "@/components/logo";
import LogoDark from "@/components/logo-dark";

const Sidebar = () => {
  return (
    <aside>
      <div className="w-72 bg-[#131725] hidden md:flex fixed left-0 top-0 h-full ">
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
      </div>
    </aside>
  );
};

export default Sidebar;
