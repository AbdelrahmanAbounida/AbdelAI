import React from "react";
import SidebarMob from "./sidebar/sidebar-mob";
import ProfileDropdown from "@/app/(dashboard)/_components/profile-dropdown";
import Toggletheme from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between px-5">
      {/** mob sheet */}
      <SidebarMob />
      {/** profile , theme */}
      <div className="flex items-center gap-2 md:ml-auto ">
        <Toggletheme />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
