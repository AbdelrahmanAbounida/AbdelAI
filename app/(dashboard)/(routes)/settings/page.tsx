"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import { SettingsSidebarNav } from "../../_components/settings/settings-sidebar-nav";
import { SettingsSidebarNavItems } from "@/constants/settings";
import { useSettings } from "@/hooks/useSettings";
import { SettingsPages } from "../../_components/settings/all-pages";
import { useSearchParams } from "next/navigation";

const Settings = () => {
  const { currentActiveTab, setCurrentActiveTab } = useSettings();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const paymentIntent = searchParams.get("payment_intent");
  const redirect_status = searchParams.get("redirect_status");

  useEffect(() => {
    const act = SettingsSidebarNavItems.find((item) =>
      item.title.includes(tab!)
    );
    if (act) {
      setCurrentActiveTab(act);
    }
  }, [tab]);

  if (paymentIntent && redirect_status) {
    return (
      <div className=" h-screen">
        <div className="p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <a
                href="/settings?tab=Billing"
                className="px-12 bg-violet-600 hover:bg-violet-500 rounded-m text-white font-semibold py-3"
              >
                GO BACK
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SettingsSidebarNav items={SettingsSidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{currentActiveTab?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {currentActiveTab?.description}
              </p>
            </div>
            <Separator />

            {/** show page according to current Tab */}
            {SettingsPages[currentActiveTab.title!]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
