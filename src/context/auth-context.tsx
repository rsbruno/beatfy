import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GetCurrentUserProfileProps } from "@/@types/user/get-current-profile";
import { DialogLogin } from "@/components/login/dialog-login";
import { spotifyServices } from "@/services/spotify";
import { userServices } from "@/services/user";
import { spotifyAxiosInstance } from "@/services/spotify-instance";

type UserDataProps = GetCurrentUserProfileProps;

type AuthContextData = {
  user: UserDataProps | null;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cookies, setCookie] = useCookies(["@beatfy:user"]);

  const [user, setUser] = useState<UserDataProps | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const spotifyAuthorizationCode = searchParams.get("code");

  const authCookie = useMemo(() => cookies["@beatfy:user"], [cookies["@beatfy:user"]]);

  const tryGetCurrentUserProfile = useCallback(async () => {
    try {
      if (authCookie) {
        const userMeResponse = await userServices.getUserProfile();
        setUser(userMeResponse);
      }
    } catch (error) {
      throw error;
    }
  }, [authCookie]);

  const trySigninWithSpotify = useCallback(async () => {
    setIsLoading(true);
    const redirectTo = spotifyServices.signinWithSpotify();
    window.location.replace(redirectTo);
  }, []);

  async function trySpotifyAuthorizationCode(code: string) {
    try {
      setIsLoading(true);
      const token = await spotifyServices.spotifyAuthorizationCode(code);
      if (token?.access_token) {
        searchParams.delete("code");
        setSearchParams(searchParams);
        setCookie("@beatfy:user", token);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const updateSpotifyAxiosInstanceToken = (token: string) => {
    if (authCookie && !spotifyAxiosInstance.defaults.headers["Authorization"])
      spotifyAxiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  };

  useEffect(() => {
    (async () => {
      updateSpotifyAxiosInstanceToken(authCookie);
      await tryGetCurrentUserProfile();
    })();
  }, [authCookie]);

  useEffect(() => {
    (async () => {
      if (spotifyAuthorizationCode) trySpotifyAuthorizationCode(spotifyAuthorizationCode);
    })();
  }, [spotifyAuthorizationCode]);

  return (
    <AuthContext.Provider value={{ user }}>
      <DialogLogin
        trySigninWithSpotify={trySigninWithSpotify}
        isLoading={isLoading}
        open={!authCookie}
      />
      <Outlet />
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
