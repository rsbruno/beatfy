import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode, useMemo } from "react";

interface PlayerButtonControlProps extends Omit<ButtonProps, "variant"> {
  variant: "primary" | "ghost";
  icon: ReactNode;
}

export default function PlayerButtonControl({
  icon: Icon,
  variant,
  ...rest
}: PlayerButtonControlProps) {
  const variantStyles = useMemo(() => {
    switch (variant) {
      case "primary":
        return "bg-white hover:bg-white border-solid border-2 border-rose-600";
      case "ghost":
        return "bg-transparent";
    }
  }, [variant]);
  return (
    <Button
      className={`w-12 h-12 flex justify-center items-center rounded-full !p-0 ${variantStyles}`}
      {...rest}
    >
      {Icon}
    </Button>
  );
}
