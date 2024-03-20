import { cn } from "@/lib/utils";
import { Logo, SidebarItem } from "@/components";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

const SIDEBAR_ITEMS = [
  {
    label: "Learn",
    iconSrc: "/learn.svg",
    href: "/learn",
  },
  {
    label: "Leaderboard",
    iconSrc: "/leaderboard.svg",
    href: "/leaderboard",
  },
  {
    label: "Quests",
    iconSrc: "/quests.svg",
    href: "/quests",
  },
  { label: "Shop", iconSrc: "/shop.svg", href: "/shop" },
];

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => (
  <div
    className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className
    )}
  >
    <Link href="/learn">
      <Logo />
    </Link>
    <div className="flex flex-col gap-y-2 flex-1">
      {SIDEBAR_ITEMS.map(({ href, iconSrc, label }) => (
        <SidebarItem key={label} label={label} iconSrc={iconSrc} href={href} />
      ))}
    </div>
    <div className="p-4">
      <ClerkLoading>
        <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
    </div>
  </div>
);
