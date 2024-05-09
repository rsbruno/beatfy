import { ComputerIcon } from "@/assets/icons/computer-icon";
import { NextIcon } from "@/assets/icons/next-icon";
import { PauseIcon } from "@/assets/icons/pause-icon";
import { PlayIcon } from "@/assets/icons/play-icon";
import { PrevIcon } from "@/assets/icons/prev-icon";
import { SpeakerIcon } from "@/assets/icons/speaker-icon";
import { Player } from "@/components/player";
import { Recommnedations } from "@/components/recommendations";
import { useAuth } from "@/context/auth-context";
import { usePlayer } from "@/context/player-context";
import { Device } from "@/services/user/user-available-devices";
import { useCallback, useMemo } from "react";

export function HomePage() {
  const { track, recommendations, topTracks } = usePlayer();
  const { devices } = useAuth();
  const iconButtonPlayPause = useMemo(() => {
    if (track?.is_playing) return <PauseIcon stroke="#e11d48" width={24} />;
    return <PlayIcon stroke="#e11d48" width={22} />;
  }, [track]);

  const HandleIconDevice = useCallback(({ device }: { device: Device }) => {
    switch (device.type) {
      case "Speaker":
        return <SpeakerIcon stroke="#fff" width={22} strokeWidth="2" />;
      default:
        return <ComputerIcon stroke="#fff" width={22} strokeWidth="2" />;
    }
  }, []);

  return (
    <section className="flex-1 flex justify-end rounded-xl">
      <aside className="flex flex-col flex-1 pr-5">
        <section className="flex justify-end">
          <div className="flex w-min gap-2 items-center justify-center">
            {devices.map((device) => (
              <HandleIconDevice key={device.id} device={device} />
            ))}
          </div>
        </section>
        <h2 className="mb-2 underline">As suas músicas favoritas</h2>
        <ul className="grid grid-cols-3 gap-2">
          {topTracks?.items?.map((item) => (
            <li className="flex justify-start items-start col-span-1 gap-2">
              <div className="size-10 overflow-hidden rounded-[6px]">
                <img src={item.album.images?.[2].url} alt="" />
              </div>
              <div className="flex flex-col justify-start items-start overflow-hidden">
                <strong className="whitespace-nowrap text-ellipsis overflow-hidden w-[220px] text-[12px]">
                  {item.name}
                </strong>
                <small className="whitespace-nowrap text-ellipsis overflow-hidden w-[220px] text-[11px] text-gray-300">
                  {item.artists.map((artist) => artist.name).join(" | ")}
                </small>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex justify-center items-center bg-black mt-5 rounded-xl opacity-25">
            <h1>Blocos em desenvolvimento...</h1>
        </div>
      </aside>
      <section className="flex flex-col justify-end items-end w-72 ">
        <main className="w-full flex flex-1 flex-col">
          <Recommnedations.ListRecommendations
            renderRecommnedation={(track) => (
              <Recommnedations.ItemRecommendations key={track.id} track={track} />
            )}
            recommendations={recommendations}
          />
        </main>
        <footer className="w-full flex flex-col h-min bg-rose-600 rounded-xl p-3 gap-3">
          <header className="w-full h-min bg-rose-700 rounded-xl overflow-hidden">
            <img src={track?.item.album.images?.[0].url} alt="" />
          </header>
          <main className="flex flex-col justify-center items-center overflow-hidden">
            <div className="w-72 px-5 mb-2">
              <Player.TrackName center />
              <Player.TrackArtistName center />
            </div>
            <div className="flex w-full gap-3 justify-center items-center">
              <Player.TrackTimeProgress />
              <Player.TrackProgressBar />
              <Player.TrackTime />
            </div>
          </main>
          <footer className="flex justify-center items-center">
            <Player.ControlButton variant="ghost" icon={<PrevIcon stroke="#fff" width={18} />} />
            <Player.ControlButton icon={iconButtonPlayPause} variant="primary" />
            <Player.ControlButton variant="ghost" icon={<NextIcon stroke="#fff" width={18} />} />
          </footer>
        </footer>
      </section>
    </section>
  );
}
