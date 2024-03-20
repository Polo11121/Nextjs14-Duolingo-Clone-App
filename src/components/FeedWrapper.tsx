import { PropsWithChildren } from "react";

export const FeedWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex-1 relative top-0 pb-10">{children}</div>
);
