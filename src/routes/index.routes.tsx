import { AuthProvider } from "@/context/auth-context";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/app-layout";
import { HomePage } from "@/pages";
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
                <Route path="" element={<HomePage />} />;
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
