import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { AuthorizateUserWithSpotifyProps, authServices } from "@/services/auth-services";
import { handleEnqueueSnackToast } from "@/lib/handle-api-exceptions";
import { SpotifyLogoPNG } from "@/assets/images";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { SmilleMusic } from "@/assets/svgs/smille-music";
import { ErrorFigure } from "@/assets/svgs/error-figure";
import { spotifyAxiosInstance } from "@/services/spotify-instance";
import { userServices } from "@/services/user";
import { GetCurrentUserProfileProps } from "@/@types/user/get-current-profile";
import { Device } from "@/services/user/user-available-devices";

type UserDataProps = GetCurrentUserProfileProps & AuthorizateUserWithSpotifyProps;

type AuthContextData = {
  trySigninRefreshToken: () => Promise<void>;
  user: UserDataProps | null;
  devices: Device[];
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cookies, setCookie, removeCookie] = useCookies(["@beatfy:user"]);

  const [user, setUser] = useState<UserDataProps | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const spotifyCodeAuthorization = searchParams.get("code");

  const [devices, setDevices] = useState<Device[]>([]);

  const refreshUserData = useCallback(
    async (tokens: UserDataProps | null) => {
      if (tokens && tokens.access_token) {
        setSearchParams(searchParams);
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        if (!cookies["@beatfy:user"]) {
          tokens.expires_in = unixTimeInSeconds + tokens.expires_in * 0.95;
          setCookie("@beatfy:user", tokens, { path: "/" });
        }
        spotifyAxiosInstance.defaults.headers["Authorization"] = `Bearer ${tokens.access_token}`;
        const userProfile = await userServices.getUserProfile();
        setUser({
          ...tokens,
          ...userProfile,
        });
      }
    },
    [cookies["@beatfy:user"]]
  );

  const trySigninWithSpotify = useCallback(async () => {
    try {
      setIsLoading(true);
      const { redirect_to } = await authServices.singinWithSpotifyToken();
      window.location.replace(redirect_to);
    } catch (error) {
      handleEnqueueSnackToast(error);
    }
  }, []);

  let apiCount = 0;
  const trySigninRefreshToken = useCallback(async () => {
    ++apiCount;
    if (apiCount > 1 || !user) return;
    try {
      const unixTimeInSeconds = Math.floor(Date.now() / 1000);
      const { access_token, expires_in, refresh_token, scope, token_type } =
        await authServices.refreshSpotifyToken(user.refresh_token);
      spotifyAxiosInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
      if (user) {
        setUser((prev) => ({
          ...prev!,
          expires_in: unixTimeInSeconds + expires_in,
          refresh_token,
          access_token,
          token_type,
          scope,
        }));
      }
    } catch (error) {
      removeCookie("@beatfy:user");
    }
  }, [user]);

  const tryAuthorizateUserWithSpotify = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      const tokens = await authServices.authorizateUserWithSpotify(code);
      if (tokens && searchParams.has("code")) {
        searchParams.delete("code");
        setSearchParams(searchParams);
        refreshUserData({ ...(tokens as UserDataProps) });
      }
    } catch (error) {
      handleEnqueueSnackToast(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const HandleDescriptionCase = useCallback(() => {
    const hasError = searchParams.get("error");
    return (
      <>
        <div>
          {hasError ? (
            <ErrorFigure width="100%" height="100%" />
          ) : (
            <SmilleMusic width="100%" height="100%" />
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h6 className="w-4/6 text-center">
            {hasError
              ? "Oh! Não conseguimos autenticar sua conta Spotify!"
              : "Ouça suas músicas favoritas, BEATFY é o palco delas!"}
          </h6>
          <small className="text-slate-400 text-[12px] mt-3">
            {hasError
              ? "Não se preocupe, a conexão que fazemos no Spotify é segura!"
              : "Entre com a sua conta Spotify, e ouça suas músicas"}
          </small>
        </div>
      </>
    );
  }, [searchParams.get("error")]);

  const modalUserAuthenticateState = useMemo(() => {
    return !Boolean(cookies["@beatfy:user"]);
  }, [cookies["@beatfy:user"]]);

  useEffect(() => {
    (async () => {
      if (spotifyCodeAuthorization) tryAuthorizateUserWithSpotify(spotifyCodeAuthorization);
    })();
  }, [spotifyCodeAuthorization]);

  useEffect(() => {
    (async () => {
      const response = await userServices.getAvailableDevices();
      setDevices(response?.devices ?? []);
    })();
  }, []);

  useLayoutEffect(() => {
    refreshUserData(cookies["@beatfy:user"]);
  }, [cookies["@beatfy:user"]]);

  return (
    <AuthContext.Provider value={{ user, trySigninRefreshToken, devices }}>
      <Dialog open={modalUserAuthenticateState}>
        <DialogContent className="!rounded-2xl !border-slate-500">
          <aside className="h-[70vh] rounded-2xl flex flex-col relative overflow-hidden">
            <Loading isLoading={isLoading} />
            <div className="flex-1 flex justify-evenly items-center flex-col">
              <HandleDescriptionCase />
            </div>
            <footer className="w-full flex justify-center items-center">
              <Button size="lg" className="rounded-full" onClick={trySigninWithSpotify}>
                <div className="flex gap-3 justify-center items-center">
                  <img src={SpotifyLogoPNG} alt="logo spotify" className="size-8 rounded-full" />
                  <strong className="font-nunito text-[16px] text-white">
                    {searchParams.has("error") ? "Continuar com Spotify" : "Entrar com Spotify"}
                  </strong>
                </div>
              </Button>
            </footer>
          </aside>
        </DialogContent>
      </Dialog>
      <Outlet />
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
