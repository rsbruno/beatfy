import { ElementType } from "react";

interface GroupMenuItemsProps {
  icon: ElementType;
  name: string;
}

export default function MenuItem({ icon: Icon, name }: GroupMenuItemsProps) {
  return (
    <li className="flex gap-3 justify-start items-center">
      <div>
        <Icon stroke="#fff" strokeWidth="1.5" width={20} />
      </div>
      <span className="text-gray-400 text-[14px]">{name}</span>
    </li>
  );
}
