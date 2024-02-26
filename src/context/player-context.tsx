import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GetCurrentlyPlayingTrack } from "@/@types/player/get-currently-playing-track";
import { MsToTimerProps, msToTimer } from "@/lib/time";
import { playerServices } from "@/services/player";
import { Outlet } from "react-router-dom";

type PlayerContextData = {
  crrTrack: GetCurrentlyPlayingTrack | null;
  trackProgress: MsToTimerProps | null;
  trackDuration: MsToTimerProps | null;
};

const PlayerContext = createContext({} as PlayerContextData);

function PlayerProvider() {
  const [crrTrack, setCrrTrack] = useState<GetCurrentlyPlayingTrack | null>(null);

  const [trackProgress, setTrackProgress] = useState<MsToTimerProps | null>(null);

  const [trackDuration, setTrackDuration] = useState<MsToTimerProps | null>(null);

  const handleProgressTimer = useCallback(
    (prev: MsToTimerProps | null, track: GetCurrentlyPlayingTrack | null) =>
      msToTimer(prev ? prev.duration_ms + 1000 : track?.progress_ms! + 1000),
    []
  );

  const tryGetCurrentlyPlayingTrack = async () => {
    setTrackProgress(null);
    const { status, data } = await playerServices.getCurrentlyPlayingTrack();
    for (let index = 0; index < 1000; index++) clearInterval(index);
    if (status === 200 && data.item !== null) {
      setCrrTrack(data);
      setTrackDuration(msToTimer(data.item.duration_ms));
      setInterval(() => setTrackProgress((prev) => handleProgressTimer(prev, data)), 999);
    } else setCrrTrack(null);
  };

  useEffect(() => {
    (async () => {
      if (crrTrack === null || trackProgress?.duration_ms! >= crrTrack.item.duration_ms)
        tryGetCurrentlyPlayingTrack();
    })();
  }, [trackProgress]);

  return (
    <PlayerContext.Provider value={{ crrTrack, trackProgress, trackDuration }}>
      <Outlet />
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}

export { PlayerProvider, usePlayer };
