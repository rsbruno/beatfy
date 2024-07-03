import { cn } from "@/lib/utils";
import { Loading } from ".";

interface BackDropLoadingProps {
  backdropPxLevel?: number;
  isLoading?: boolean;
}

export default function BackDropLoading({
  backdropPxLevel = 1,
  isLoading = true,
}: BackDropLoadingProps) {
  if (!isLoading) return <></>;
  return (
    <span
      className={cn(
        `absolute backdrop-blur-[${backdropPxLevel}px] top-0 left-0 w-full h-full z-50
         flex justify-center items-center`
      )}
    >
      <Loading.Spinner />
    </span>
  );
}
