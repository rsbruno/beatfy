import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GetCurrentUserProfileProps } from "@/@types/user/get-current-profile";
import { Device } from "@/services/user/user-available-devices";
import { DialogLogin } from "@/components/login/dialog-login";
import { spotifyServices } from "@/services/spotify";

type UserDataProps = GetCurrentUserProfileProps;

type AuthContextData = {
  trySigninRefreshToken: () => Promise<void>;
  user: UserDataProps | null;
  devices: Device[];
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cookies, setCookie] = useCookies(["@beatfy:user"]);

  const [user] = useState<UserDataProps | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const spotifyAuthorizationCode = searchParams.get("code");

  const [devices] = useState<Device[]>([]);

  const trySigninRefreshToken = useCallback(async () => {}, [user]);

  const trySigninWithSpotify = useCallback(async () => {
    setIsLoading(true);
    const redirectTo = spotifyServices.signinWithSpotify();
    window.location.replace(redirectTo);
  }, []);

  const spotifyAuthenticationCookie = useMemo(() => {
    const cookie = cookies["@beatfy:user"];
    /* if (cookie?.access_token) */
    /* spotifyAxiosInstance.defaults.headers["Authorization"] = `Bearer ${cookie?.access_token}`; */
    return !Boolean(cookie);
  }, [cookies["@beatfy:user"]]);

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

  useEffect(() => {
    (async () => {
      if (spotifyAuthorizationCode) trySpotifyAuthorizationCode(spotifyAuthorizationCode);
    })();
  }, [spotifyAuthorizationCode]);

  return (
    <AuthContext.Provider value={{ user, trySigninRefreshToken, devices }}>
      <DialogLogin
        isLoading={isLoading}
        open={spotifyAuthenticationCookie}
        trySigninWithSpotify={trySigninWithSpotify}
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
