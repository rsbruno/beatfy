import { Buffer } from "buffer";
import axios from "axios";

export interface SpotifyRefreshTokenProps {
  access_token: string;
}

export const refreshTokenSpotify = async (token: string) => {
  var payloadAuth = {
    url: `${import.meta.env.VITE_APP_SPOTIFY_API_ACCOUNT}/api/token`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID}:${
            import.meta.env.VITE_APP_SPOTIFY_SECRET_KEY
          }`
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: token,
    },
  };

  return await axios.post<SpotifyRefreshTokenProps>(payloadAuth.url, payloadAuth.form, {
    headers: payloadAuth.headers,
  });
};
