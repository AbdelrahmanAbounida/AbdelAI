import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import PageHeader from "./_components/page-header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  {
    /** TODO Design Sidebar  */
  }
  return (
    <div className="flex items-center">
      {/**sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="md:pl-72   w-full">
        <div className="flex flex-col gap-1 p-2">
          <div className="w-full">
            <NextTopLoader color="#4F46E5" speed={300} />
          </div>
          <Navbar />
          <div className="p-4 flex flex-col gap-3">
            <PageHeader />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
