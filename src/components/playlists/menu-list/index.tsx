import { ReactNode } from "react";
import {
  GetCurrentUserPlaylists,
  PlaylistsProps,
  } from "@/@types/playlists/get-current-user-playlists";
import { FETCH_CONFIGS } from "@/constants/fetch-configs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBeatfyFetch } from "@/hooks/useBeatfyFetch";
import { playlistServices } from "@/services/playlists";
import { Skeleton } from "@/components/skeleton";
import { PlayList } from "..";

interface PlaylistMenuListProps {
  renderComponent: (props: PlaylistsProps) => ReactNode;
}

export default function PlaylistMenuList({ renderComponent }: PlaylistMenuListProps) {
  const {
    data: playlists,
    isLoading,
    isIdle,
  } = useBeatfyFetch<GetCurrentUserPlaylists>(
    "user-playlists",
    playlistServices.getCurrentUserPlaylists,
    {
      refetchInterval: FETCH_CONFIGS.REVALIDATE_DATA_IN_10_MIN,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ScrollArea className="h-full w-full rounded-md">
      <ul className="py-2">
        <Skeleton
          isLoading={isIdle || isLoading}
          repeat={15}
          fallBackComponent={(key) => (
            <PlayList.MenuListContent
              tracksAmount={0}
              ownerName=""
              images={[]}
              isLoading
              key={key}
            />
          )}
        >
          {playlists?.items.map((plalist) => renderComponent(plalist))}
        </Skeleton>
      </ul>
    </ScrollArea>
  );
}
