import { Buffer } from "buffer";
import axios from "axios";
import { handleApiMessages } from "@/lib/handle-api-exceptions";

interface SpotifyTokenProps {
  refresh_token: string;
  access_token: string;
}

export const spotifyAuthorizationCode = async (code: string) => {
  const payloadAuth = {
    url: `${import.meta.env.VITE_APP_SPOTIFY_API_ACCOUNT}/api/token`,
    form: {
      redirect_uri: import.meta.env.VITE_APP_SPOTIFY_REDIRECT_CALLBACK,
      grant_type: "authorization_code",
      code,
    },
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
  };
  try {
    const {
      data: { access_token, refresh_token },
    } = await axios.post<SpotifyTokenProps>(payloadAuth.url, payloadAuth.form, {
      headers: payloadAuth.headers,
    });
    return {
      refresh_token,
      access_token,
    } as SpotifyTokenProps;
  } catch (error) {
    handleApiMessages(error);
  }
};
