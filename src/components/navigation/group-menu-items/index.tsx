import { MenuItemsProps } from "@/routes/public.routes";
import { ReactNode } from "react";

interface GroupMenuItemsProps {
  renderComponent: (props: MenuItemsProps) => ReactNode;
  menuItems: MenuItemsProps[];
}

export default function GroupMenuItems({ renderComponent, menuItems }: GroupMenuItemsProps) {
  return (
    <ul className="flex flex-col gap-2">
      {menuItems.map((menuItem) => renderComponent(menuItem))}
    </ul>
  );
}
