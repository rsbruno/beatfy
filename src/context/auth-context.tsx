import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { DialogLogin } from "@/components/login/dialog-login";
import { spotifyServices } from "@/services/spotify";
import { userServices } from "@/services/user";
import useSyncFetch from "@/hooks/useSyncFetch";
import { TokenProps } from "@/@types/auth";
import { MeProps } from "@/@types/user/me";
import { useCookies } from "react-cookie";

type AuthContextData = {
  user: MeProps | null;
};

const cookieName = "@beatfy:user";

const AuthContext = createContext({} as AuthContextData);

function AuthProvider() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cookies, setCookie] = useCookies([cookieName]);

  const [user, setUser] = useState<MeProps | null>(null);

  const spotifyAuthorizationCode = searchParams.get("code");

  useSyncFetch({
    service: userServices.getUserProfile,
    onSuccess: setUser,
    enableFetch: cookies[cookieName],
  });

  const trySigninWithSpotify = useCallback(async () => {
    const url = spotifyServices.signinWithSpotify();
    window.location.replace(url);
  }, []);

  const { fn: trySpotifyAuthorizationCode } = useSyncFetch({
    service: (code) => spotifyServices.spotifyAuthorizationCode(code),
    onSuccess: onSuccessTrySpotifyAuthorizationCode,
  });

  function onSuccessTrySpotifyAuthorizationCode(data: TokenProps) {
    setCookie(cookieName, data);
    searchParams.delete("code");
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (spotifyAuthorizationCode) trySpotifyAuthorizationCode(spotifyAuthorizationCode);
  }, [spotifyAuthorizationCode]);

  return (
    <AuthContext.Provider value={{ user }}>
      <DialogLogin
        trySigninWithSpotify={trySigninWithSpotify}
        isLoading={false}
        open={!cookies[cookieName]}
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
