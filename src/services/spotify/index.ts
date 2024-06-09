import { refreshTokenSpotify } from "./refresh-token-spotify";
import { signinWithSpotify } from "./signin-with-spotify";
import { spotifyAuthorizationCode } from "./spotify-authorization-code";

export const spotifyServices = {
  spotifyAuthorizationCode,
  refreshTokenSpotify,
  signinWithSpotify,
};
