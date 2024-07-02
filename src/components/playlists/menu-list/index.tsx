import { ReactNode } from "react";
import { PlaylistsProps } from "@/@types/playlists/get-current-user-playlists";
import { playlistServices } from "@/services/playlists";
import { Skeleton } from "@/components/skeleton";
import useSyncFetch from "@/hooks/useSyncFetch";
import { PlayList } from "..";

interface PlaylistMenuListProps {
  renderComponent: (props: PlaylistsProps) => ReactNode;
}

export default function PlaylistMenuList({ renderComponent }: PlaylistMenuListProps) {
  const { data, isPending } = useSyncFetch({
    service: playlistServices.getCurrentUserPlaylists,
    enableFetch: true,
  });

  return (
    <Skeleton
      isLoading={isPending}
      repeat={10}
      fallBackComponent={(key) => (
        <PlayList.MenuListContent tracksAmount={0} ownerName="" images={[]} isLoading key={key} />
      )}
    >
      {data?.items.map((plalist) => renderComponent(plalist))}
    </Skeleton>
  );
}
