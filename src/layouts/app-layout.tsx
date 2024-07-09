import { Player } from "@/components/player";
import { PlayList } from "@/components/playlists";
import { User } from "@/components/user";

export function AppLayout() {
  return (
    <section className="w-screen h-screen flex bg-[#000]">
      <div className="w-72 h-full p-5 pr-1 pt-12 flex flex-col">
        <aside className="pr-5">
          <User.UserAvatar />
          <div className="mt-3">
            <User.UserName />
            <User.UserFollowers />
          </div>
        </aside>
        <main className="flex-1 flex flex-col overflow-auto mt-3 relative">
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
        </main>
        <footer>
          <aside className="w-full h-min pr-5">
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
      </div>
      <main className="flex-1 bg-[#242424] m-3 ml-0 rounded-xl p-3 flex flex-col"></main>
    </section>
  );
}
