import { usePlayer } from "@/context/player-context";

interface TrackNameProps {
  name?: string;
}

export default function TrackName({ name }: TrackNameProps) {
  const { crrTrack } = usePlayer();
  return (
    <h2 className="leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white">
      {crrTrack?.item.name ? crrTrack?.item.name : name}
    </h2>
  );
}
