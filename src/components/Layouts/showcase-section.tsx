import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  className?: string;
};

export function ShowcaseSection({  children, className }: PropsType) {
  return (
    <div className="rounded-[10px] bg-white flex flex-col  mx-auto shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className={cn("p-4 sm:p-6 xl:p-10", className)}>{children}</div>
    </div>
  );
}
