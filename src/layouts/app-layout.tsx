import { HomeIcon } from "@/assets/icons/home-icon";
import { NextIcon } from "@/assets/icons/next-icon";
import { PlayIcon } from "@/assets/icons/play-icon";
import { PrevIcon } from "@/assets/icons/prev-icon";
import { SearchIcon } from "@/assets/icons/search-icon";

export function AppLayout() {
  return (
    <section className="w-screen h-screen flex bg-[#000]">
      <aside className="w-72 h-full p-5 pt-12 flex flex-col gap-4">
        <div>
          <div className="size-16 bg-gray-600"></div>
          <h1 className="text-gray-200 font-medium leading-6 text-xl mt-3">
            Bruno
            <br />
            <small className="text-gray-400">Roberto Santos</small>
          </h1>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <nav>
            <div>
              <span className="text-white font-medium text-[12px] uppercase mb-3">menu</span>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-3 justify-start items-center">
                <div>
                  <HomeIcon primaryElement={{ stroke: "#fff", strokeWidth: "1.5" }} width={20} />
                </div>
                <span className="text-white">Explorar</span>
              </li>

              <li className="flex gap-3 justify-start items-center">
                <div>
                  <SearchIcon stroke="#9ca3af" width={20} />
                </div>
                <span className="text-gray-400">Procurar</span>
              </li>
            </ul>
          </nav>

          <nav>
            <div>
              <span className="text-white font-medium text-[12px] uppercase mb-3">Biblioteca</span>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-3 justify-start items-center">
                <div>
                  <HomeIcon primaryElement={{ stroke: "#fff", strokeWidth: "1.5" }} width={20} />
                </div>
                <span className="text-white">Favoritas</span>
              </li>

              <li className="flex gap-3 justify-start items-center">
                <div>
                  <SearchIcon stroke="#9ca3af" width={20} />
                </div>
                <span className="text-gray-400">Playlists</span>
              </li>
            </ul>
          </nav>
        </div>
        <footer>
          <div className="w-full h-min bg-gray-600 rounded-xl p-3 flex flex-col gap-4 relative">
            <div className="absolute -top-8 left-[6%] w-[88%] h-8 bg-gray-400 rounded-t-xl flex items-center px-3 gap-1">
              <span className="text-[12px]">2:00</span>
              <div className="flex w-full bg-gray-600 border border-solid border-gray-600 h-1 rounded-full overflow-hidden">
                <span className="w-3/5 h-1 bg-gray-100"></span>
              </div>
              <span className="text-[12px]">3:48</span>
            </div>
            <div className="flex gap-3">
              <div className="size-14 bg-gray-600"></div>
              <div className="flex-1 flex flex-col justify-center overflow-hidden gap-2">
                <h2 className="leading-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-white">
                  Tá Rocheda
                </h2>
                <small className="leading-3 text-gray-200 text-[12px]">
                  Os barões da pisadinha
                </small>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 bg-transparent flex justify-center items-center rounded-full">
                <PrevIcon stroke="#fff" width={18} />
              </div>

              <div className="w-12 h-12 bg-white flex justify-center items-center rounded-full">
                <PlayIcon stroke="#000" width={18} />
              </div>

              <div className="w-12 h-12 bg-transparent  flex justify-center items-center rounded-full">
                <NextIcon stroke="#fff" width={18} />
              </div>
            </div>
          </div>
        </footer>
      </aside>

      <main className="flex-1 bg-[#242424] m-3 ml-0 rounded-xl p-3">
        <header className="flex justify-between items-center">
          <h2 className="text-white text-3xl !font-nunito font-black">Explorar</h2>
          <div>
            <div className="w-64 h-10 bg-[#121212] rounded-full flex justify-start items-center px-4 border-2 border-solid border-[#000] gap-2">
              <SearchIcon stroke="#fff" width={20} />
              <small className="text-white opacity-60">o que você quer ouvir?</small>
            </div>
          </div>
        </header>
        <section className="my-3">
          <h3 className="text-white">Playlists</h3>
          <div className="w-full grid grid-cols-5">
            <div className="col-span-1 w-full h-36 bg-gray-600 rounded-3xl relative">
              <footer className="flex w-full px-4 absolute bottom-2">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="!font-nunito font-black text-white leading-3">Lovenejo</h3>
                  <small className="leading-3 text-[12px] text-white">16 músicas - Bruno</small>
                </div>
                <div className="w-12 h-12 bg-white flex justify-center items-center rounded-full">
                  <PlayIcon stroke="#000" width={18} />
                </div>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
