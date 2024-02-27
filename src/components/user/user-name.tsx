import { useAuth } from "@/context/auth-context";

export default function UserName() {
  const { user } = useAuth();
  return (
    <h1
      className={`text-gray-200 font-medium text-xl leading-4 h-[18px] w-24 ${
        !user ? "pulse-loading bg-gray-500" : ""
      }`}
    >
      {user && user?.display_name}
    </h1>
  );
}
