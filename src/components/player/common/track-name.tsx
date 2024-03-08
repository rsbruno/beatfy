import { usePlayer } from "@/context/player-context";

interface TrackNameProps {
  center?: boolean;
  name?: string;
}

export default function TrackName({ name, center = false }: TrackNameProps) {
  const { track } = usePlayer();
  return (
    <h2
      className={`
        leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white w-full h-[18px]
        ${!track ? "animate-pulse bg-rose-700" : ""} ${center ? "text-center" : "text-left"}
    `}
    >
      {track?.item.name ? track?.item.name : name}
    </h2>
  );
}
