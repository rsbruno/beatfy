import { MeProps } from "@/@types/user/me";
import { spotifyAxiosInstance } from "../spotify-instance";

const getCurrentUserProfile = async () => {
  return await spotifyAxiosInstance.get<MeProps>(`v1/me`);
};

export default getCurrentUserProfile;
