import { ImageProps } from "../image";

export interface MeProps {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageProps[];
  type: string;
  uri: string;
  followers: {
    href: string;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
}
