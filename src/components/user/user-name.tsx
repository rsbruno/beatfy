import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export default function UserName() {
  const { user } = useAuth();
  return (
    <h1
      className={cn(
        "text-gray-200 font-medium text-xl leading-4 h-[18px] w-24",
        !user && "pulse-loading bg-gray-500 w-1/2"
      )}
    >
      {user && user?.display_name}
    </h1>
  );
}
