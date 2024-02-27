import { useAuth } from "@/context/auth-context";

export default function UserAvatar() {
  const { user } = useAuth();
  return (
    <div
      className={`size-16 overflow-hidden rounded-xl ${!user ? "pulse-loading bg-gray-500" : ""}`}
    >
      {!!user && <img src={user?.images?.[1]?.url ?? ""} alt={user?.display_name} />}
    </div>
  );
}
