import { HomePage } from "@/pages/[public]";
import { ElementType } from "react";
import { Route, Routes } from "react-router-dom";

export interface MenuItemsProps {
  icon: ElementType;
  name: string;
  id: number;
  path?: string;
}

export function PublicRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="" element={<HomePage />} />;
      </Route>
    </Routes>
  );
}
