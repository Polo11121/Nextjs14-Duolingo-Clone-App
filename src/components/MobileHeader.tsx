import { MobileSidebar } from "@/components";

export const MobileHeader = () => (
  <nav className="lg:hidden px-6 h-[50px] bg-green-500 flex items-center border-b top-0 w-full z-50">
    <MobileSidebar />
  </nav>
);
