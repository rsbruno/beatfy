import { Navigation } from "@/components/navigation";
import { PlayList } from "@/components/playlists";
import { menuItems } from "@/routes/public.routes";
import { Player } from "@/components/player";
import { User } from "@/components/user";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <section className="w-screen h-screen flex bg-[#000]">
      <aside className="w-72 h-full p-5 pt-12 flex flex-col gap-3">
        <aside>
          <User.UserAvatar />
          <div className="mt-3">
            <User.UserName />
            <User.UserFollowers />
          </div>
        </aside>
        <main className="flex-1 flex flex-col gap-3 overflow-hidden">
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
        </main>
        <footer>
          <aside className="w-full h-min">
            <header className="h-8 mx-3 bg-rose-500 border-solid border-2 border-rose-900 rounded-t-xl flex items-center px-3 gap-1">
              <Player.TrackTimeProgress />
              <Player.TrackProgressBar />
              <Player.TrackTime />
            </header>
            <section className="w-full h-min bg-rose-600 border-solid border-2 border-rose-900 rounded-xl p-3 flex flex-col gap-4 relative">
              <main className="flex gap-3">
                <Player.TrackCover />
                <section className="flex-1 flex flex-col justify-center overflow-hidden gap-1">
                  <Player.TrackName />
                  <Player.TrackArtistName />
                </section>
              </main>
            </section>
          </aside>
        </footer>
      </aside>
      <main className="flex-1 bg-[#242424] m-3 ml-0 rounded-xl p-3 flex flex-col">
        <Outlet />
      </main>
    </section>
  );
}
