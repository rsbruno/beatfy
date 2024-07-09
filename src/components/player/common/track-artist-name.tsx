import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

interface TrackArtistNameProps {
  name?: string;
  center?: boolean;
}

export default function TrackArtistName({ name, center = false }: TrackArtistNameProps) {
  const { track } = usePlayer();

  const artistName = useMemo(() => {
    if (track?.item?.artists.length)
      return track?.item?.artists.map((artist) => artist.name).join(" | ");
    else name;
  }, [track, name]);

  return (
    <small
      className={`
        block leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-regular text-white w-max text-[12px] h-[14px]
        ${!track ? "animate-pulse bg-rose-700" : ""} ${center ? "text-center mx-auto" : "text-left"}
    `}
    >
      {artistName}
    </small>
  );
}
