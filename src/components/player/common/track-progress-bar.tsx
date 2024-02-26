import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/context/player-context";
import { useMemo } from "react";

export default function TrackProgressBar() {
  const { trackProgress, trackDuration } = usePlayer();
  const percentProgress = useMemo(() => {
    if (trackProgress && trackDuration?.duration_ms)
      return (trackProgress.duration_ms / trackDuration.duration_ms) * 100;
    return 0;
  }, [trackProgress]);
  return (
    <Progress className="bg-black h-[5px]" indicatorColor="bg-white" value={percentProgress} />
  );
}
