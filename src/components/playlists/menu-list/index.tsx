import { ReactNode } from "react";
import {
  GetCurrentUserPlaylists,
  PlaylistsProps,
} from "@/@types/playlists/get-current-user-playlists";
import { playlistServices } from "@/services/playlists";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/skeleton";
import { PlayList } from "..";
import { useBeatfyFetch } from "@/hooks/useBeatfyFetch";
import { FETCH_CONFIGS } from "@/constants/fetch-configs";

interface PlaylistMenuListProps {
  renderComponent: (props: PlaylistsProps) => ReactNode;
}

export default function PlaylistMenuList({ renderComponent }: PlaylistMenuListProps) {
  const { data: playlists, isFetching } = useBeatfyFetch<GetCurrentUserPlaylists>(
    "user-playlists",
    playlistServices.getCurrentUserPlaylists,
    {
      refetchInterval: FETCH_CONFIGS.REVALIDATE_DATA_IN_10_MIN,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ScrollArea className="h-52 w-60 rounded-md">
      <ul className="overflow-hidden">
        <Skeleton
          isLoading={isFetching}
          repeat={5}
          fallBackComponent={(key) => (
            <PlayList.MenuListContent
              ownerName={""}
              tracksAmount={0}
              isLoading
              images={[]}
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
