import { SettingTab } from "@/hooks/useSettings";
import React from "react";
import ProfileForm from "./profile-form";
import History from "./history-view";
import Billing from "./billing";
import Appearance from "./appearance";
import TokenUsage from "./token-usage";

export const SettingsPages: { [key in SettingTab["title"]]: React.ReactNode } =
  {
    Profile: <ProfileForm />,
    History: <History />,
    Billing: <Billing />,
    Appearance: <Appearance />,
    Tokens: <TokenUsage />,
  };
