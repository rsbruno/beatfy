import { usePlayer } from "@/context/player-context";

export default function TrackTimeProgress({ time }: { time?: string }) {
  const { trackProgress, track } = usePlayer();
  return (
    <span
      className={`text-[12px] w-10 text-left h-3 rounded-[3px] ${
        !track ? "animate-pulse bg-rose-700" : ""
      }`}
    >
      {trackProgress?.time
        ? `${trackProgress?.time.minutes}:${trackProgress?.time.seconds
            .toString()
            .padStart(2, "0")}`
        : time}
    </span>
  );
}
