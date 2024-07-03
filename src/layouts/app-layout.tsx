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
        <main className="flex-1 flex flex-col overflow-auto mt-3 relative"></main>
        <footer></footer>
      </div>
      <main className="flex-1 bg-[#242424] m-3 ml-0 rounded-xl p-3 flex flex-col"></main>
    </section>
  );
}
