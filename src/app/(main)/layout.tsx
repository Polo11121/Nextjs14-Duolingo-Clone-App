import { PropsWithChildren } from "react";
import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <>
    <MobileHeader />
    <Sidebar className="hidden lg:flex" />
    <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">{children}</main>
  </>
);

export default MainLayout;
