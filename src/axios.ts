import axiosInstance from "axios";
import MockAdapter from "axios-mock-adapter";
import { refreshUser } from "./services/users";
// import { AuthService } from "./services/authService";

const axios = axiosInstance.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: import.meta.env.VITE_APP_IS_DOCKER
    ? "http://localhost:3000/api"
    : "/api",
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
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

if (import.meta.env.DEV && !import.meta.env.VITE_APP_IS_DOCKER) {
  console.log("Development Environment, using axios mock");

  const [{ mockMovies }, { mockUsers }, { mockPosts }] = await Promise.all([
    import("./mocks/movies"),
    import("./mocks/users"),
    import("./mocks/posts"),
  ]);

  const mock = new MockAdapter(axios, { delayResponse: 1500 });

  mockMovies(mock);
  mockUsers(mock);
  mockPosts(mock);
}

export default axios;
