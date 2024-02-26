import { ImageProps } from "@/@types/image";
import { PlayListIcon } from "@/assets/icons/playlist-icon";
import { useMemo } from "react";

interface PlaylistMenuListContentProps {
  tracksAmount: number;
  images: ImageProps[];
  ownerName: string;
  name: string;
  active?: boolean;
}

export default function PlaylistMenuListContent({
  active = false,
  tracksAmount,
  ownerName,
  images,
  name,
}: PlaylistMenuListContentProps) {
  const textColor = useMemo(() => (active ? "text-rose-500" : "text-gray-300"), [active]);
  const textPropsColor = useMemo(() => (active ? "text-rose-500" : "text-gray-400"), [active]);
  const iconColor = useMemo(() => (active ? "#e11d48" : "#fff"), [active]);

  return (
    <li className="flex justify-between items-center gap-3 py-1 rounded-lg hover:px-[px] transition-all ease-linear duration-200 cursor-pointer">
      <div>
        <PlayListIcon stroke={iconColor} width="20" height="20" />
      </div>
      <div className="flex-1 flex gap-2 overflow-hidden">
        <strong
          className={`text-[14px] font-normal whitespace-nowrap overflow-hidden text-ellipsis ${textColor}`}
        >
          {name}
        </strong>
      </div>
      <div className="flex flex-col items-end">
        <small className={`text-[10px] ${textPropsColor}`}>{ownerName}</small>
        <small className={`text-[10px] ${textPropsColor}`}>{tracksAmount} músicas</small>
      </div>
      <div className="size-6 rounded-[6px] bg-gray-500 overflow-hidden">
        <img src={images?.[0].url} alt={name} />
      </div>
    </li>
  );
}
