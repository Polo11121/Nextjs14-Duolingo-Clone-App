import { PropsWithChildren } from "react";
import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="min-h-screen flex flex-col">
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />
    <main className="flex flex-1 lg:pl-[256px] pt-[50px] lg:pt-0">
      <div className=" flex-1 max-w-[1056px] mx-auto pt-6 ">{children}</div>
    </main>
  </div>
);

export default MainLayout;
