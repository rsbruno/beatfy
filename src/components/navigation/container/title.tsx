import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  isLoading?: boolean;
  title?: string;
}

export default function Title({ isLoading, children, title }: TitleProps) {
  return (
    <div>
      <span
        className={cn(
          "text-gray-300 font-medium text-[12px] uppercase mb-3",
          isLoading && "pulse-loading bg-gray-500 overflow-hidden w-3/4 text-transparent"
        )}
      >
        {children ?? title}
      </span>
    </div>
  );
}
