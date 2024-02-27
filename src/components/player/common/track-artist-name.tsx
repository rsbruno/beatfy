import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

interface TrackArtistNameProps {
  name?: string;
}

export default function TrackArtistName({ name }: TrackArtistNameProps) {
  const { track } = usePlayer();

  const artistName = useMemo(() => {
    if (track?.item?.artists.length)
      return track?.item?.artists.map((artist) => artist.name).join(" | ");
    else name;
  }, [track, name]);

  return (
    <small
      className={`
        leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-regular text-white text-[12px] w-full h-[14px]
        ${!track ? "animate-pulse bg-rose-700" : ""}
    `}
    >
      {artistName}
    </small>
  );
}
