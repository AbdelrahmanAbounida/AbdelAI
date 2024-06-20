"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SidebarItems } from "@/constants/nav";
import { Icons } from "@/constants/icons";
import { useTheme } from "next-themes";
import { CheckIcon } from "lucide-react";
import UpgradeButton from "../upgrade-button";
import { usePayment } from "@/hooks/usePayment";

const UpgradeModal = () => {
  const { theme } = useTheme();
  const { paymentModalOpen, setPaymentModal } = usePayment();

  return (
    <Dialog
      open={paymentModalOpen}
      onOpenChange={(newval) => setPaymentModal(newval)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-full  text-center text-2xl  font-bold py-3 flex item-center gap-2 justify-center">
            Upgrade to AbdelAI
            <Badge
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-sm rounded-2xl text-white"
              variant="outline"
            >
              PRO
            </Badge>
          </DialogTitle>
          <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full mt-4">
            {SidebarItems.slice(1, SidebarItems.length - 1).map(
              (item, index) => {
                const Icon = Icons[item.icon];
                return (
                  <div
                    key={index}
                    className="shadow-sm border py-4    w-full flex items-center justify-between group rounded-md p-5"
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
                    <CheckIcon
                      className="w-5 h-5  transition-all"
                      color="#7C3AED"
                    />
                  </div>
                );
              }
            )}
          </div>
        </DialogHeader>

        <DialogFooter>
          <div className="h-10 w-full">
            <UpgradeButton />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
