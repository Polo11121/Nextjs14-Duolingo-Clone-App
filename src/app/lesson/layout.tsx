import { PropsWithChildren } from "react";

export const LessonLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <div className="flex flex-col h-full">
    <div className="flex flex-col w-full h-full">{children}</div>
  </div>
);

export default LessonLayout;
