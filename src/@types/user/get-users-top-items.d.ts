import { AlbumProps } from "../album";
import { Arthist } from "../arthist";

export type GetUsersTopItems = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  total: number;
  items: {
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
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }[];
};
