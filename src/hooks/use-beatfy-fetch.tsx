import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

type FetchFunction<T> = () => Promise<T>;

export function useBeatfyFetch<T>(
  queryKey: string,
  fetchFn: FetchFunction<T>,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> {
  const queryResults = useQuery([queryKey], fetchFn, {
    refetchOnWindowFocus: true,
    ...options,
  } as any);

  return queryResults as any;
}
