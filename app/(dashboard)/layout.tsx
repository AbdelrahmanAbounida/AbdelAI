import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  {
    /** TODO Design Sidebar  */
  }
  return (
    <div className="flex items-center">
      {/**sidebar */}
      <Sidebar />

      <div className="md:pl-72   w-full">
        <div className="flex flex-col gap-1 p-2">
          <div className="w-full">
            <NextTopLoader color="#4F46E5" speed={300} />
          </div>
          <Navbar />

          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
