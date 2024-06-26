import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { useAuth } from "@/context/auth-context";

type FetchFunction<T> = () => Promise<T>;

export function useBeatfyFetch<T>(
  queryKey: string,
  fetchFn: FetchFunction<T>,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> {
  const { user } = useAuth();

  const queryResults = useQuery([queryKey, user], fetchFn, {
    refetchOnWindowFocus: true,
    enabled: !!user,
    ...options,
  } as any);

  return queryResults as any;
}
