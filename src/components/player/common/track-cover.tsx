import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

interface TrackCoverProps {}

export default function TrackCover({}: TrackCoverProps) {
  const { track } = usePlayer();

  const uriCoverTrack = useMemo(() => {
    if (track?.item.album.images.length) return track?.item.album.images[0].url;
    return "";
  }, [track]);

  return (
    <div
      className={`size-14 bg-rose-700 rounded-xl overflow-hidden ${!track ? "animate-pulse" : ""}`}
    >
      {track && <img src={uriCoverTrack} alt={track?.item.album.name} />}
    </div>
  );
}
