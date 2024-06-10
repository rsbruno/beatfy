import { ReactNode } from "react";

export default function Title({
  isLoading,
  children,
  title,
}: {
  children?: ReactNode;
  isLoading?: boolean;
  title?: string;
}) {
  return (
    <div>
      <span
        className={`text-gray-300 font-medium text-[12px] uppercase mb-3 
       ${isLoading ? "pulse-loading bg-gray-500 overflow-hidden w-3/4 text-transparent" : ""}
      `}
      >
        {children ?? title}
      </span>
    </div>
  );
}
