import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

interface TrackCoverProps {}

export default function TrackCover({}: TrackCoverProps) {
  const { crrTrack } = usePlayer();

  const uriCoverTrack = useMemo(() => {
    if (crrTrack?.item.album.images.length) return crrTrack?.item.album.images[0].url;
    return "";
  }, [crrTrack]);

  return (
    <div className="size-14 bg-rose-500 rounded-xl overflow-hidden">
      {crrTrack && <img src={uriCoverTrack} alt={crrTrack?.item.album.name} />}
    </div>
  );
}
