import axios from "axios";

const bffAxiosInstance = axios.create({
  baseURL: "https://api-trackfy.vercel.app",
  // baseURL: "http://localhost:8080",
  timeout: 10000,
});

export { bffAxiosInstance };
