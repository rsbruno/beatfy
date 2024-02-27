import { ImageProps } from "../image";
import { Owner } from "../user/owner";

export interface GetCurrentUserPlaylists {
  href: string;
  items: PlaylistsProps[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface PlaylistsProps {
  collaborative: false;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageProps[];
  name: string;
  owner: Owner;
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}
