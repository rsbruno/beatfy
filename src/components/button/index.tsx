import { Button as Btn, ButtonProps as Props } from "../ui/button";
import { Loading } from "../loading";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Props {
  children?: ReactNode;
  isLoading?: boolean;
  text?: string;
}

export function Button({ isLoading = false, children, text, ...props }: ButtonProps) {
  return (
    <Btn
      {...props}
      type={props.type ?? "button"}
      className={cn("h-10 relative overflow-hidden", props.className)}
    >
      <Loading.BackDropLoading isLoading={isLoading} />
      {children}
      {text}
    </Btn>
  );
}
