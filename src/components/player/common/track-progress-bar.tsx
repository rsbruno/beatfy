import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

export default function TrackProgressBar() {
  const { trackProgress, track } = usePlayer();
  const percentProgress = useMemo(() => {
    if (trackProgress && track?.duration?.duration_ms)
      return (trackProgress.duration_ms / track.duration.duration_ms) * 100;
    return 0;
  }, [trackProgress]);
  return (
    <Progress
      className={`bg-rose-700 h-[5px] ${!track ? "animate-pulse" : ""}`}
      indicatorColor="bg-white"
      value={percentProgress}
    />
  );
}
