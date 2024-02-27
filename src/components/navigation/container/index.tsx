import { ReactNode } from "react";

export default function Container({ children }: { children?: ReactNode }) {
  return <nav className="flex flex-col gap-3">{children}</nav>;
}
