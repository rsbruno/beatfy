import { GetCurrentUserPlaylists } from "@/@types/playlists/get-current-user-playlists";
import { spotifyAxiosInstance } from "../spotify-instance";

const getCurrentUserPlaylists = async () => {
  const { data } = await spotifyAxiosInstance.get<GetCurrentUserPlaylists>(`v1/me/playlists`);
  return data;
};

export default getCurrentUserPlaylists;
