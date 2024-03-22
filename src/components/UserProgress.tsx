import Link from "next/link";
import { Button } from "@/components/ui";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schemas";

type UserProgressProps = {
  hasActiveSubscription: boolean;
  points: number;
  hearts: number;
  activeCourse: typeof courses.$inferSelect;
};

export const UserProgress = ({
  hasActiveSubscription,
  points,
  hearts,
  activeCourse,
}: UserProgressProps) => (
  <div className="flex items-center justify-between gap-x-2 w-full">
    <Link href="/courses">
      <Button variant="ghost">
        <Image
          src={activeCourse.imageSrc}
          alt={activeCourse.title}
          width={32}
          height={32}
          className="rounded-md border mr-2"
        />
        {points}
      </Button>
    </Link>
    <Link href="/shop">
      <Button variant="ghost" className="text-orange-500">
        <Image
          src="/points.svg"
          height={28}
          width={28}
          alt="Points"
          className="mr-2"
        />
        {points}
      </Button>
    </Link>{" "}
    <Link href="/shop">
      <Button variant="ghost" className="text-rose-500">
        <Image
          src="/heart.svg"
          height={22}
          width={22}
          alt="Points"
          className="mr-2"
        />
        {hasActiveSubscription ? hearts : <InfinityIcon />}
      </Button>
    </Link>
  </div>
);
