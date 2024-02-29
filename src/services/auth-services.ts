import { bffAxiosInstance } from "./bff-axios-instance";

export type SinginWithSpotifyTokenProps = {
  redirect_to: string;
};

const singinWithSpotifyToken = async () => {
  const { data } = await bffAxiosInstance.get<SinginWithSpotifyTokenProps>("/auth/spotify");
  return data;
};

export type AuthorizateUserWithSpotifyProps = {
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  access_token: string;
};

const authorizateUserWithSpotify = async (code: string) => {
  const { data } = await bffAxiosInstance.get<AuthorizateUserWithSpotifyProps>(
    "/auth/spotify/callback",
    {
      params: {
        code,
      },
    }
  );
  return data;
};

type RefreshTokenSpotifyProps = {
  refresh_token: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

const refreshSpotifyToken = async (token: string) => {
  const { data } = await bffAxiosInstance.get<RefreshTokenSpotifyProps>(
    "/auth/spotify/refresh-token",
    {
      params: {
        refresh_token: token,
      },
    }
  );
  return data;
};

export const authServices = {
  authorizateUserWithSpotify,
  singinWithSpotifyToken,
  refreshSpotifyToken,
};
