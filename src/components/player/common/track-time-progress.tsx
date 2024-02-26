import { usePlayer } from "@/context/player-context";

export default function TrackTimeProgress({ time }: { time?: string }) {
  const { trackProgress } = usePlayer();
  return (
    <span className="text-[12px] w-10 text-left">
      {trackProgress?.time
        ? `${trackProgress?.time.minutes}:${trackProgress?.time.seconds
            .toString()
            .padStart(2, "0")}`
        : time}
    </span>
  );
}
