import { challengeOptions } from "@/db/schemas";

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
  return <div>{text}</div>;
};
