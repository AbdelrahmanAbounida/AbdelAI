import { LucideIcon } from "lucide-react";
import { Icons } from "./icons";

export interface SideNavItemProps {
  title: string;
  icon: keyof typeof Icons;
  color: string;
  bgColor: string;
  link: string;
}

export const SidebarItems: SideNavItemProps[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    color: "#4396C7",
    link: "/dashboard",
    bgColor: "",
  },
  {
    title: "Conversation",
    icon: "chat",
    color: "#765BCA",
    link: "/conversation",
    bgColor: "#F5EDFF",
  },
  {
    title: "Image Generation",
    icon: "image",
    color: "#931F51",
    link: "/image",
    bgColor: "#F8E7EE",
  },
  {
    title: "Video Generation",
    icon: "video",
    color: "#B0391A",
    link: "/video",
    bgColor: "#F9EBE6",
  },
  {
    title: "Music Generation",
    icon: "music",
    color: "#40A783",
    link: "/music",
    bgColor: "#E6F8F4",
  },
  {
    title: "Code Generation",
    icon: "code",
    color: "#2F6949",
    link: "/code",
    bgColor: "#E8F1EC",
  },
  {
    title: "Settings",
    icon: "setting",
    color: "#9294A0",
    link: "/settings",
    bgColor: "",
  },
];
