"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { SettingsSidebarNav } from "../../_components/settings/settings-sidebar-nav";
import { SettingsSidebarNavItems } from "@/constants/settings";
import { useSettings } from "@/hooks/useSettings";
import { SettingsPages } from "../../_components/settings/all-pages";

const Settings = () => {
  const { currentActiveTab } = useSettings();

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
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
