import { TokenProps } from "@/@types/auth";
import { Buffer } from "buffer";
import axios from "axios";

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
  return await axios.post<TokenProps>(payloadAuth.url, payloadAuth.form, {
    headers: payloadAuth.headers,
  });
};
