"use client";
import { Icons } from "@/constants/icons";
import { SidebarItems } from "@/constants/nav";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2  items-center justify-center mt-10">
        <h1 className="text-4xl font-bold">Explore the power of AI</h1>
        <h3 className="text-gray-500 text-xl">
          Chat with the smartest AI - Experience the power of AI
        </h3>
      </div>
      <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full mt-4">
        {SidebarItems.slice(1, SidebarItems.length - 1).map((item, index) => {
          const Icon = Icons[item.icon];
          return (
            <Link
              href={item.link}
              key={index}
              className="shadow-sm border py-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 w-full flex items-center justify-between group rounded-md p-5"
            >
              <div className="flex items-center gap-2">
                {/** icon */}
                {Icon && (
                  <div
                    style={{
                      backgroundColor:
                        theme == "dark" ? item.darkBgColor : item.bgColor,
                    }}
                    className={`flex items-center justify-center dark:bg-slate-900 w-[40px] h-[40px]  p-1 rounded-md`}
                  >
                    <Icon color={item.color} size={29} />
                  </div>
                )}

                {/** title */}
                <span className="font-semibold text-md dark:text-white/80">
                  {item.title}
                </span>
              </div>

              {/** arrow icon */}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
