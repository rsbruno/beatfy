import { GetCurrentUserPlaylists } from "@/@types/playlists/get-current-user-playlists";
import { spotifyAxiosInstance } from "../spotify-instance";

const getCurrentUserPlaylists = async () =>
  await spotifyAxiosInstance.get<GetCurrentUserPlaylists>(`v1/me/playlists`);

export default getCurrentUserPlaylists;
