import { challengeOptions } from "@/db/schemas";
import { useAudio, useKey } from "react-use";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AnswerProps = {
  onClick: () => void;
  isSelected: boolean;
  isDisabled: boolean;
  shortcut: string;
  type: string;
  status: "correct" | "wrong" | "none";
} & typeof challengeOptions.$inferSelect;

export const Answer = ({
  onClick,
  isSelected,
  isDisabled,
  shortcut,
  type,
  imageSrc,
  audioSrc,
  status,
  text,
}: AnswerProps) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const clickHandler = useCallback(() => {
    if (isDisabled) {
      return;
    }

    controls.play();
    onClick();
  }, [isDisabled, onClick, controls]);

  useKey(shortcut, clickHandler, {}, [clickHandler]);

  return (
    <div
      onClick={clickHandler}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        isSelected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        isSelected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        isSelected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        isDisabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            isSelected && "text-sky-500",
            isSelected && status === "correct" && "text-green-500",
            isSelected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
            isSelected && "border-sky-300 text-sky-500",
            isSelected &&
              status === "correct" &&
              "border-green-500 text-green-500",
            isSelected && status === "wrong" && "border-rose-500 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
