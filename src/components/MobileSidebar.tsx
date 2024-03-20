import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { Sidebar } from "@/components";
import { Menu } from "lucide-react";

export const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger>
      <Menu />
    </SheetTrigger>
    <SheetContent className="p-0 z-[100]" side="left">
      <Sidebar className="border-0" />
    </SheetContent>
  </Sheet>
);
