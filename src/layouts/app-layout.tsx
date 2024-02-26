import { NextIcon } from "@/assets/icons/next-icon";
import { PauseIcon } from "@/assets/icons/pause-icon";
import { PlayIcon } from "@/assets/icons/play-icon";
import { PrevIcon } from "@/assets/icons/prev-icon";
import { SearchIcon } from "@/assets/icons/search-icon";
import { Navigation } from "@/components/navigation";
import { Player } from "@/components/player";
import { PlayList } from "@/components/playlists";
import { useAuth } from "@/context/auth-context";
import { usePlayer } from "@/context/player-context";
import { menuItems } from "@/routes/public.routes";
import { useMemo } from "react";

export function AppLayout() {
  const { user } = useAuth();
  const { crrTrack } = usePlayer();

  const followersText = useMemo(() => {
    switch (true) {
      case user && user?.followers.total > 0:
        return `${user?.followers.total} - seguidores`;
      case user && user?.followers?.total === 0:
        return "Você ainda não tem seguidores";
      default:
        return "";
    }
  }, [user, user?.followers.total]);

  const iconButtonPlayPause = useMemo(() => {
    if (crrTrack?.is_playing) return <PauseIcon stroke="#e11d48" width={24} />;
    return <PlayIcon stroke="#e11d48" width={22} />;
  }, [crrTrack]);

  return (
    <section className="w-screen h-screen flex bg-[#000]">
      <aside className="w-72 h-full p-5 pt-12 flex flex-col gap-4">
        <div>
          <div className="size-16 overflow-hidden rounded-xl">
            <img src={user?.images?.[1]?.url ?? ""} alt={user?.display_name} />
          </div>
          <h1 className="text-gray-200 font-medium text-xl mt-3 leading-4">
            {user?.display_name}
            <br />
            <small className="text-gray-400 text-[12px]">{followersText}</small>
          </h1>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <Navigation.Container>
            <Navigation.Title title="Menu" />
            <Navigation.GroupMenuItems
              menuItems={menuItems}
              renderComponent={({ icon, name, id }) => (
                <Navigation.MenuItem icon={icon} name={name} key={id} />
              )}
            />
          </Navigation.Container>

          <Navigation.Container>
            <Navigation.Title title="Biblioteca" />
            <PlayList.MenuList
              renderComponent={({ name, tracks, owner, images, id }) => (
                <PlayList.MenuListContent
                  ownerName={owner.display_name}
                  tracksAmount={tracks.total}
                  images={images}
                  name={name}
                  key={id}
                />
              )}
            />
          </Navigation.Container>
        </div>
        <footer>
          <aside className="w-full h-min bg-rose-600 border-solid border-2 border-rose-900 rounded-xl p-3 flex flex-col gap-4 relative">
            <header className="absolute -top-8 left-[6%] w-[88%] h-8 bg-rose-500 border-solid border-2 border-rose-900 rounded-t-xl flex items-center px-3 gap-1">
              <Player.TrackTimeProgress />
              <Player.TrackProgressBar />
              <Player.TrackTime />
            </header>
            <main className="flex gap-3">
              <Player.TrackCover />
              <section className="flex-1 flex flex-col justify-center overflow-hidden gap-2">
                <Player.TrackName />
                <Player.TrackArtistName />
              </section>
            </main>
            <footer className="flex justify-center items-center">
              <Player.ControlButton variant="ghost" icon={<PrevIcon stroke="#fff" width={18} />} />
              <Player.ControlButton icon={iconButtonPlayPause} variant="primary" />
              <Player.ControlButton variant="ghost" icon={<NextIcon stroke="#fff" width={18} />} />
            </footer>
          </aside>
        </footer>
      </aside>

      <main className="flex-1 bg-[#242424] m-3 ml-0 rounded-xl p-3"></main>
    </section>
  );
}
