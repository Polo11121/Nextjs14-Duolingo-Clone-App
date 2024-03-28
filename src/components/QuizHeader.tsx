import { useExitModalStore } from "@/store/useExitModal";
import { InfinityIcon, X } from "lucide-react";
import { Progress } from "@/components/ui";
import Image from "next/image";

type QuizHeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscriptions: boolean;
};

export const QuizHeader = ({
  hearts,
  percentage,
  hasActiveSubscriptions,
}: QuizHeaderProps) => {
  const openExitModalHandler = useExitModalStore((state) => state.onOpen);

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 gap-x-7 flex items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={openExitModalHandler}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hasActiveSubscriptions ? (
          <InfinityIcon className="w-6 h-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
