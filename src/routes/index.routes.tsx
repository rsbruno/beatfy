import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public.routes";
import { AppLayout } from "@/layouts/app-layout";
import { AuthProvider } from "@/context/auth-context";

export function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/*" element={<AuthProvider />}>
          <Route path="" element={<AppLayout />}>
            <Route path="" element={<PublicRoutes />} />;
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
