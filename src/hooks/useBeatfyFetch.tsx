import { useEffect } from "react";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { spotifyAxiosInstance } from "@/services/spotify-instance";
import { useAuth } from "@/context/auth-context";

type FetchFunction<T> = () => Promise<T>;

export function useBeatfyFetch<T>(
  queryKey: string,
  fetchFn: FetchFunction<T>,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> {
  const { user, trySigninRefreshToken } = useAuth();

  const queryResults = useQuery([queryKey, user], fetchFn, {
    refetchOnWindowFocus: true,
    enabled: !!user,
    ...options,
  } as any);

  useEffect(() => {
    const unixTimeInSeconds = Math.floor(Date.now() / 1000);
    const experided_in = user?.expires_in ?? 0;
    const token = spotifyAxiosInstance.defaults.headers["Authorization"];
    if (experided_in > unixTimeInSeconds && !!token) queryResults.refetch();
    else trySigninRefreshToken();
  }, [spotifyAxiosInstance.defaults.headers["Authorization"], user]);
  return queryResults as any;
}
