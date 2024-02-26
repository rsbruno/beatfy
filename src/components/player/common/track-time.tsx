import { usePlayer } from "@/context/player-context";

export default function TrackTime({ time }: { time?: string }) {
  const { trackDuration } = usePlayer();
  return (
    <span className="text-[12px] w-10 text-center">
      {trackDuration?.duration_ms
        ? `${trackDuration.time.minutes}:${trackDuration.time.seconds.toString().padStart(2, "0")}`
        : time}
    </span>
  );
}
