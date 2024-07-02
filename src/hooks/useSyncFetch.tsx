import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

interface UseFetchDataOptions<IData, IParams = any, G = IData> {
  service: (params?: IParams) => Promise<AxiosResponse<IData>>;
  onSuccess?: (data: IData) => void | Promise<void>;
  mapData?: (data: IData) => G | Promise<G>;
  onError?: (error: any) => void;
  initialValueParams?: IParams;
  enableFetch?: boolean;
  afterTry?: () => void;
}

function useSyncFetch<IData, IParams = any, G = IData>({
  service,
  onSuccess,
  onError,
  afterTry,
  mapData,
  initialValueParams,
  enableFetch,
}: UseFetchDataOptions<IData, IParams, G>) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<IData | G | null>(null);
  async function tryFetchData(params?: IParams): Promise<G | IData> {
    try {
      setIsPending(true);
      const response = await service(params);
      const responseData = response.data;
      if (onSuccess) await onSuccess(responseData);
      const mappedData = mapData ? await mapData(responseData) : (responseData as unknown as G);
      if (Array.isArray(mappedData) && mappedData.length === 0) {
        setData([] as IData | G);
        return [] as IData | G;
      }
      setData(mappedData);
      return mappedData;
    } finally {
      setIsPending(false);
    }
  }

  function onFailureFetchData(error: any) {
    console.log(error);
    toast("Erro não definido!", {
      description: String(error?.message ?? ""),
    });
  }

  const fn = async (params?: IParams): Promise<G | IData | null> => {
    try {
      return await tryFetchData(params);
    } catch (error) {
      onError?.(error) ?? onFailureFetchData(error);
      return null;
    } finally {
      afterTry?.();
    }
  };

  useEffect(() => {
    if (enableFetch && !isPending) fn(initialValueParams as IParams);
  }, []);

  return { fn, isPending, data };
}

export default useSyncFetch;
