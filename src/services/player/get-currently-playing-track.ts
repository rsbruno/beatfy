import { GetCurrentlyPlayingTrack } from "@/@types/player/get-currently-playing-track";
import { spotifyAxiosInstance } from "../spotify-instance";

const getCurrentlyPlayingTrack = async () => {
  return await spotifyAxiosInstance.get<GetCurrentlyPlayingTrack>(`v1/me/player/currently-playing`);
};

export default getCurrentlyPlayingTrack;
