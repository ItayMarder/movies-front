import axiosInstance from "axios";
// import MockAdapter from "axios-mock-adapter";
import { refreshUser } from "./services/users";

export const baseURL = "http://localhost:3000";
const axios = axiosInstance.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: baseURL + "/api",
});

axios.interceptors.request.use((config) => {
  if (config.url?.includes("/logout") || config.url?.includes("/refresh")) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
  } else {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.config.url !== "/auth/refresh"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const userData = await refreshUser(refreshToken);
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
