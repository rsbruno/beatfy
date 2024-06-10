import { PlayListIcon } from "@/assets/icons/playlist-icon";
import { ImageProps } from "@/@types/image";
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
  active = false,
  tracksAmount,
  ownerName,
  isLoading,
  images,
  name,
}: PlaylistMenuListContentProps) {
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
          className={`
            text-[14px] font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-4
            ${textColor} ${isLoading ? "pulse-loading bg-gray-500 w-full h-5" : ""}
          `}
        >
          {!isLoading && name}
        </strong>
      </div>
      <div className="flex flex-col items-end justify-between h-7">
        <small
          className={`text-[10px] ${textPropsColor} ${
            isLoading ? "pulse-loading bg-gray-500 h-3 w-8" : ""
          }`}
        >
          {!isLoading && ownerName}
        </small>
        <small
          className={`text-[10px] ${
            isLoading ? "pulse-loading bg-gray-500 h-3 w-6" : ""
          } ${textPropsColor}`}
        >
          {!isLoading && `${tracksAmount} músicas`}
        </small>
      </div>
      <div
        className={`
          size-6 rounded-[6px] overflow-hidden ${
            isLoading ? "pulse-loading bg-gray-500" : ""
          }`}
      >
        {!isLoading && (
          <img src={images?.[0]?.url} alt={name} className={isLoading ? "invisible" : ""} />
        )}
      </div>
    </li>
  );
}
