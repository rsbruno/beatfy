import { ReactNode } from "react";

export default function Title({ children, title }: { children?: ReactNode; title?: string }) {
  return (
    <div>
      <span className="text-gray-300 font-medium text-[12px] uppercase mb-3">{children ?? title}</span>
    </div>
  );
}
