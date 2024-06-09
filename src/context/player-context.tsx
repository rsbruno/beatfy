import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GetCurrentlyPlayingTrack } from "@/@types/player/get-currently-playing-track";
import { useBeatfyFetch } from "@/hooks/useBeatfyFetch";
import { MsToTimerProps, msToTimer } from "@/lib/time";
import { playerServices } from "@/services/player";
import { Outlet } from "react-router-dom";

type PlayerContextData = {
  track: GetCurrentlyPlayingTrack | null;
  trackProgress: MsToTimerProps | null;
};

const PlayerContext = createContext({} as PlayerContextData);

const SECOND_MS = 1000;

function PlayerProvider() {
  let lastPrev = 0;

  const [track, setTrack] = useState<GetCurrentlyPlayingTrack | null>(null);

  const [trackProgress, setTrackProgress] = useState<MsToTimerProps | null>(null);

  const counterProgress = useCallback(
    (prev: MsToTimerProps | null, crrTrack: GetCurrentlyPlayingTrack | null) => {
      if (lastPrev === crrTrack?.progress_ms)
        return msToTimer(prev ? prev.duration_ms + SECOND_MS : lastPrev + SECOND_MS);
      lastPrev = crrTrack?.progress_ms ?? lastPrev;
      return msToTimer(crrTrack?.progress_ms! + SECOND_MS);
    },
    [track]
  );

  const { data: response, refetch } = useBeatfyFetch(
    "currently-playing-track",
    playerServices.getCurrentlyPlayingTrack
  );

  useEffect(() => {
    if (response?.status === 200 && response.data.item !== null) {
      for (let index = 0; index < SECOND_MS; index++) clearInterval(index);
      setTrack({ ...response.data, duration: msToTimer(response.data.item.duration_ms) });
      const isPlaying = response.data.is_playing;
      document.title = `${isPlaying ? "Ouvindo" : "Pausado"} • ${response.data.item.name}`;
      if (response.data.is_playing)
        setInterval(() => setTrackProgress((prev) => counterProgress(prev, response.data)), 999);
      else setTrackProgress((prev) => counterProgress(prev, response.data));
    }
  }, [response]);

  useEffect(() => {
    if (track === null || trackProgress?.duration_ms! >= response?.data.item.duration_ms!)
      refetch?.();
  }, [trackProgress]);

  return (
    <PlayerContext.Provider value={{ track, trackProgress }}>
      <Outlet />
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}

export { PlayerProvider, usePlayer };
