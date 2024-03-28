import { challengeOptions, challenges } from "@/db/schemas";
import { cn } from "@/lib/utils";
import { Answer } from "@/components";

type ChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[];
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  isDisabled: boolean;
  type: (typeof challenges.$inferSelect)["type"];
  onSelect: (id: number) => void;
};

export const Challenge = ({
  options,
  status,
  selectedOption,
  isDisabled,
  type,
  onSelect,
}: ChallengeProps) => (
  <div
    className={cn(
      "grid gap-2",
      type === "ASSIST" && "grid-cols-1",
      type === "SELECT" &&
        "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
    )}
  >
    {options.map((option, index) => {
      const isSelected = selectedOption === option.id;
      const shortcut = `${index + 1}`;
      const clickHandler = () => onSelect(option.id);

      return (
        <Answer
          key={option.id}
          onClick={clickHandler}
          isSelected={isSelected}
          isDisabled={isDisabled}
          shortcut={shortcut}
          type={type}
          status={status}
          {...option}
        />
      );
    })}
  </div>
);
