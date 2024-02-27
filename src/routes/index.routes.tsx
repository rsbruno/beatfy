import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public.routes";
import { AppLayout } from "@/layouts/app-layout";
import { AuthProvider } from "@/context/auth-context";
import { PlayerProvider } from "@/context/player-context";
import { FetchApiProvider } from "@/context/fetch-api-context";

export function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/*" element={<AuthProvider />}>
          <Route path="" element={<FetchApiProvider />}>
            <Route path="" element={<PlayerProvider />}>
              <Route path="" element={<AppLayout />}>
                <Route path="" element={<PublicRoutes />} />;
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
