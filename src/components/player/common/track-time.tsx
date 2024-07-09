import { usePlayer } from "@/context/player-context";

export default function TrackTime({ time }: { time?: string }) {
  const { track } = usePlayer();
  return (
    <span
      className={`text-[12px] w-10 text-center h-3 rounded-[3px] ${
        !track ? "animate-pulse bg-rose-700" : ""
      }`}
    >
      {track?.duration?.duration_ms
        ? `${track.duration.time.minutes}:${track.duration.time.seconds
            .toString()
            .padStart(2, "0")}`
        : time}
    </span>
  );
}
