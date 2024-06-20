import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Sidebar from "./sidebar";

const SidebarMob = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMob;
