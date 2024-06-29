import { useAuth } from "@/context/auth-context";
import { useMemo } from "react";

export default function UserFollowers() {
  const { user } = useAuth();
  const followersText = useMemo(() => {
    switch (true && !!user) {
      case user && user?.followers.total > 0:
        return `${user?.followers.total} - seguidores`;
      case user && user?.followers?.total === 0:
        return "Você ainda não tem seguidores";
      default:
        return "";
    }
  }, [user, user?.followers.total]);
  return (
    <small
      className={`text-gray-400 text-[12px] mt-2 h-[16px] w-32 ${
        !user ? "pulse-loading bg-gray-500 block overflow-hidden w-3/4" : ""
      }`}
    >
      {followersText}
    </small>
  );
}
