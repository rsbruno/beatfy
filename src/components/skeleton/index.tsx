import { ReactNode } from "react";

interface SkeletonProps {
  fallBackComponent: (key: number) => ReactNode;
  children: ReactNode;
  repeat: number;
  isLoading: boolean;
}

export function Skeleton({ repeat = 1, fallBackComponent, children, isLoading }: SkeletonProps) {
  if (!isLoading) return <>{children}</>;
  return Array.from(Array(repeat).keys()).map((key: number) => fallBackComponent(key));
}
