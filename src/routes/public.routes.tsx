import { HomeIcon } from "@/assets/icons/home-icon";
import { SearchIcon } from "@/assets/icons/search-icon";
import { HomePage } from "@/pages/[public]";
import { ElementType } from "react";
import { Route, Routes } from "react-router-dom";

export interface MenuItemsProps {
  icon: ElementType;
  name: string;
  id: number;
  path?: string;
}

export const menuItems = [
  {
    id: 1,
    path: "/",
    icon: HomeIcon,
    name: "Explorar",
  },
  {
    id: 2,
    icon: SearchIcon,
    name: "Procurar",
  },
] as MenuItemsProps[];

export function PublicRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="" element={<HomePage />} />;
      </Route>
    </Routes>
  );
}
