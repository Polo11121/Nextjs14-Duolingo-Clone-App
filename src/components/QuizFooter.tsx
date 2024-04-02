import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import Link from "next/link";

type QuizFooterProps = {
  isDisabled: boolean;
  status: "correct" | "wrong" | "none" | "completed";
  onCheck: () => void;
  lessonId: number;
};

export const QuizFooter = ({
  isDisabled,
  status,
  onCheck,
  lessonId,
}: QuizFooterProps) => {
  const isMobile = useMedia("(max-width: 1024px)");

  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div>
            <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
              <CheckCircle className="w-6 h-6 lg:h-10 lg:w-10 mr-4" />
              Nicely done!
            </div>
          </div>
        )}
        {status === "wrong" && (
          <div>
            <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
              <XCircle className="w-6 h-6 lg:h-10 lg:w-10 mr-4" />
              Try again!
            </div>
          </div>
        )}
        {status === "completed" && (
          <Button variant="default" size={isMobile ? "sm" : "lg"} asChild>
            <Link href={`/lesson/${lessonId}`}>Practice again</Link>
          </Button>
        )}
        <Button
          disabled={isDisabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};
