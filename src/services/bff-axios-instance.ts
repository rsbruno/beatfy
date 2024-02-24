import axios from "axios";

const bffAxiosInstance = axios.create({
  baseURL: "https://api-trackfy.vercel.app",
  timeout: 10000,
});

export { bffAxiosInstance };
