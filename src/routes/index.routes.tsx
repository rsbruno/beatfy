import { AuthProvider } from "@/context/auth-context";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/app-layout";
import { HomePage } from "@/pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/*" element={<AuthProvider />}>
          <Route path="" element={<AppLayout />}>
            <Route path="" element={<HomePage />} />;
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
