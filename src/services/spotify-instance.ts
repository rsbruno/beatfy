import axios from "axios";

const spotifyAxiosInstance = axios.create({
  baseURL: "https://api.spotify.com/",
  timeout: 10000,
});

export { spotifyAxiosInstance };
