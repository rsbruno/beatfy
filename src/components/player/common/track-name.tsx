import { usePlayer } from "@/context/player-context";

interface TrackNameProps {
  name?: string;
}

export default function TrackName({ name }: TrackNameProps) {
  const { track } = usePlayer();
  return (
    <h2
      className={`
        leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white w-full h-[18px]
        ${!track ? "animate-pulse bg-rose-700" : ""}
    `}
    >
      {track?.item.name ? track?.item.name : name}
    </h2>
  );
}
