import getUserProfile from "./get-current-user-profile";
import getRecommendations from "./get-recommendation";
import getAvailableDevices from "./user-available-devices";
import getUsersTopItems from "./get-users-top-items";

export const userServices = {
  getAvailableDevices,
  getRecommendations,
  getUsersTopItems,
  getUserProfile,
};
