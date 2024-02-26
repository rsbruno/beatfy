import { spotifyAxiosInstance } from "../spotify-instance";

const getCurrentUserProfile = async () => {
  const { data } = await spotifyAxiosInstance.get<any>(`v1/me`);
  return data;
};

export default getCurrentUserProfile;
