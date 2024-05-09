import { spotifyAxiosInstance } from "../spotify-instance";

interface AvailableDevices {
  devices: Device[];
}

export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
};

const getAvailableDevices = async () => {
  const { data } = await spotifyAxiosInstance.get<AvailableDevices>(`v1/me/player/devices`);
  return data;
};

export default getAvailableDevices;
