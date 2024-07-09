import { ImageProps } from "@/@types/image";
import { PlayListIcon } from "@/assets/icons/playlist-icon";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface PlaylistMenuListContentProps {
  tracksAmount: number;
  images: ImageProps[];
  ownerName: string;
  active?: boolean;
  isLoading?: boolean;
  name?: string;
}

export default function PlaylistMenuListContent({
  isLoading = false,
  tracksAmount = 0,
  active = false,
  ownerName = "",
  images = [],
  name = "",
}: Partial<PlaylistMenuListContentProps>) {
  const textColor = useMemo(() => (active ? "text-rose-500" : "text-gray-300"), [active]);
  const textPropsColor = useMemo(() => (active ? "text-rose-500" : "text-gray-400"), [active]);
  const iconColor = useMemo(() => (active ? "#e11d48" : "#fff"), [active]);

  return (
    <li className="flex w-60 justify-between items-center gap-3 py-1 rounded-lg transition-all ease-linear duration-300 cursor-pointer">
      <div className={isLoading ? "pulse-loading" : ""}>
        <PlayListIcon stroke={iconColor} width="20" height="20" />
      </div>
      <div className="flex-1 flex gap-2 overflow-hidden">
        <strong
          className={cn(
            "text-[14px] font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-4",
            isLoading && "pulse-loading bg-gray-500 w-full h-5",
            textColor
          )}
        >
          {!isLoading && name}
        </strong>
      </div>
      <div className="flex flex-col items-end justify-between h-7">
        <small
          className={cn(
            "text-[10px]",
            isLoading && "pulse-loading bg-gray-500 h-3 w-8",
            textPropsColor
          )}
        >
          {!isLoading && ownerName}
        </small>
        <small
          className={cn(
            isLoading && "pulse-loading bg-gray-500 h-3 w-6",
            textPropsColor,
            "text-[10px]"
          )}
        >
          {!isLoading && `${tracksAmount} músicas`}
        </small>
      </div>
      <div
        className={cn(
          "size-6 rounded-[4px] overflow-hidden",
          isLoading && "pulse-loading bg-gray-500"
        )}
      >
        {!isLoading && (
          <img src={images?.[0]?.url} alt={name} className={isLoading ? "invisible" : ""} />
        )}
      </div>
    </li>
  );
}
