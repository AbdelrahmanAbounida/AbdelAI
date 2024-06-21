import { SettingsSidebarNavItems } from "@/constants/settings";
import { create } from "zustand";

export type SettingTab = (typeof SettingsSidebarNavItems)[number];

type SettingsStore = {
  currentActiveTab: SettingTab;
  setCurrentActiveTab: (newTab: SettingTab) => void;
};

export const useSettings = create<SettingsStore>((set) => ({
  currentActiveTab: SettingsSidebarNavItems[0],
  setCurrentActiveTab(newTab) {
    set({
      currentActiveTab: newTab,
    });
  },
}));
