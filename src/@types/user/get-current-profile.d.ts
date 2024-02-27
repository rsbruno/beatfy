export interface GetCurrentUserProfileProps {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  type: string;
  uri: string;
  followers: {
    href: string;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: false;
    filter_locked: false;
  };
  email: string;
}
