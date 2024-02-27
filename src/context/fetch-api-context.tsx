import { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

const FetchApiContext = createContext({});

const queryClient = new QueryClient();

function FetchApiProvider() {
  return (
    <FetchApiContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </FetchApiContext.Provider>
  );
}

function useFetchApi() {
  const context = useContext(FetchApiContext);
  return context;
}

export { FetchApiProvider, useFetchApi, queryClient };
