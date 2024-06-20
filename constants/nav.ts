import { LucideIcon } from "lucide-react";
import { Icons } from "./icons";

interface NavIcon {
  title: string;
  icon: keyof typeof Icons;
  color: string;
  link: string;
}

export const SidebarItems: NavIcon[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    color: "#183761",
    link: "/dashboard",
  },
  {
    title: "Conversation",
    icon: "dashboard",
    color: "#1D1249",
    link: "/conversation",
  },
  {
    title: "Image Generation",
    icon: "image",
    color: "#931F51",
    link: "/image",
  },
  {
    title: "Video Generation",
    icon: "video",
    color: "#B0391A",
    link: "/video",
  },
  {
    title: "Music Generation",
    icon: "music",
    color: "#40A783",
    link: "/music",
  },
  {
    title: "Code Generation",
    icon: "code",
    color: "#2F6949",
    link: "/code",
  },
  {
    title: "Settings",
    icon: "settings",
    color: "#9294A0",
    link: "/settings",
  },
];
