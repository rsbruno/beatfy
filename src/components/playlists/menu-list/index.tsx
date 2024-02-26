import { ReactNode, useEffect, useState } from "react";
import { playlistServices } from "@/services/playlists";
import { PlaylistsProps } from "@/@types/playlists/get-current-user-playlists";

interface PlaylistMenuListProps {
  renderComponent: (props: PlaylistsProps) => ReactNode;
}

export default function PlaylistMenuList({ renderComponent }: PlaylistMenuListProps) {
  const [plalists, setplalists] = useState<PlaylistsProps[]>([]);
  useEffect(() => {
    (async () => {
      const { items } = await playlistServices.getCurrentUserPlaylists();
      setplalists(items);
    })();
  }, []);

  return <ul>{plalists.map((plalist) => renderComponent(plalist))}</ul>;
}
