import { Arthist } from "../arthist";
import { ImageProps } from "../image";

export interface RecomendationTracks {
  tracks: Recommendation[];
}

export type Recommendation = {
  album: {
    album_type: string;
    artists: Arthist[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageProps[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: 18;
    type: string;
    uri: string;
  };
  artists: Arthist[];
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
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};
