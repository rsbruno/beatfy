import { GetUsersTopItems } from "@/@types/user/get-users-top-items";
import { spotifyAxiosInstance } from "../spotify-instance";

const getUsersTopItems = async () => {
  const { data } = await spotifyAxiosInstance.get<GetUsersTopItems>(`v1/me/top/tracks`, {
    params: {
      limit: 12,
    },
  });
  return data;
};

export default getUsersTopItems;
