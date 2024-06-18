import React from "react";
import Sidebar from "./_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  {
    /** TODO Design Sidebar  */
  }
  return (
    <div className="flex items-center">
      {/**sidebar */}
      <Sidebar />

      <div className="md:pl-64">{children}</div>
    </div>
  );
};

export default MainLayout;
