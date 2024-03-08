import { AlbumProps } from "../album";
import { ImageProps } from "../image";

export interface UsersQueue {
  queue: Queue[];
}

export type Queue = {
  album: AlbumProps;
  artists: Arthist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};
