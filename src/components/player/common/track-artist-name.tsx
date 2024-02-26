import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

interface TrackArtistNameProps {
  name?: string;
}

export default function TrackArtistName({ name }: TrackArtistNameProps) {
  const { crrTrack } = usePlayer();

  const artistName = useMemo(() => {
    if (crrTrack?.item?.artists.length)
      return crrTrack?.item?.artists.map((artist) => artist.name).join(" | ");
    else name;
  }, [crrTrack, name]);

  return (
    <small className="leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-regular text-white text-[12px]">
      {artistName}
    </small>
  );
}
