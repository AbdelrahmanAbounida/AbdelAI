import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Sidebar from "./sidebar";

const SidebarMob = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">
        <HamburgerMenuIcon className="w-7 h-7" />
      </SheetTrigger>
      <SheetContent className="w-72" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMob;
