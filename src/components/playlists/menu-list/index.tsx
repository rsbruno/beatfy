import { ReactNode } from "react";
import { PlaylistsProps } from "@/@types/playlists/get-current-user-playlists";
import { playlistServices } from "@/services/playlists";
import { Skeleton } from "@/components/skeleton";
import useSyncFetch from "@/hooks/useSyncFetch";
import { PlayList } from "..";
import { cn } from "@/lib/utils";

interface PlaylistMenuListProps {
  renderComponent: (props: PlaylistsProps) => ReactNode;
}

export default function PlaylistMenuList({ renderComponent }: PlaylistMenuListProps) {
  const { data, isPending } = useSyncFetch({
    service: playlistServices.getCurrentUserPlaylists,
    enableFetch: true,
  });

  return (
    <>
      <h2 className={cn("text-sm text-zinc-400", isPending && "pulse-loading bg-gray-500 w-1/2 text-transparent")}>Biblioteca</h2>
      <Skeleton
        fallBackComponent={(key) => <PlayList.MenuListContent key={key} isLoading />}
        isLoading={isPending}
        repeat={10}
      >
        {data?.items.map((plalist) => renderComponent(plalist))}
      </Skeleton>
    </>
  );
}
