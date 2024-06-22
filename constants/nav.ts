import { LucideIcon } from "lucide-react";
import { Icons } from "./icons";

export interface SideNavItemProps {
  title: string;
  icon: keyof typeof Icons;
  color: string;
  bgColor: string;
  darkBgColor: string;
  link: string;
  description?: string;
}

export const SidebarItems: SideNavItemProps[] = [
  {
    title: "Home",
    icon: "dashboard",
    color: "#4396C7",
    link: "/dashboard",
    bgColor: "",
    darkBgColor: "#1a1a1a",
  },
  {
    title: "Conversation",
    icon: "chat",
    color: "#765BCA",
    link: "/conversation",
    bgColor: "#F5EDFF",
    darkBgColor: "#2B1B37",
    description: "Our most advanced conversation model",
  },
  {
    title: "Image Generation",
    icon: "image",
    color: "#931F51",
    link: "/image",
    bgColor: "#F8E7EE",
    darkBgColor: "#3B1B2B",
    description: "Turn your prompt into an image.",
  },
  {
    title: "Video Generation",
    icon: "video",
    color: "#B0391A",
    link: "/video",
    bgColor: "#F9EBE6",
    darkBgColor: "#3B1B1B",
    description: "Turn your prompt into a video",
  },
  {
    title: "Music Generation",
    icon: "music",
    color: "#40A783",
    link: "/music",
    bgColor: "#E6F8F4",
    darkBgColor: "#1B3B3B",
    description: "Turn your prompt into music",
  },
  {
    title: "Code Generation",
    icon: "code",
    color: "#2F6949",
    link: "/code",
    bgColor: "#E8F1EC",
    darkBgColor: "#1B2B2B",
    description: "Turn your prompt into code",
  },
  {
    title: "Settings",
    icon: "setting",
    color: "#9294A0",
    link: "/settings",
    bgColor: "",
    darkBgColor: "#1a1a1a",
    description: "Manage your account settings and set e-mail preferences.",
  },
];
