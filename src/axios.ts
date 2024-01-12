import axiosInstance from "axios";
import MockAdapter from "axios-mock-adapter";
// import { AuthService } from "./services/authService";

const axios = axiosInstance.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: "/api",
});

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       AuthService.logout();
//     }

//     return Promise.reject(error);
//   }
// );

if (import.meta.env.DEV && !import.meta.env.VITE_APP_IS_DOCKER) {
  console.log("Development Environment, using axios mock");

  const [{ mockMovies }, { mockUsers }, { mockPosts }] = await Promise.all([
    import("./mocks/movies"),
    import("./mocks/users"),
    import("./mocks/posts"),
  ]);

  const mock = new MockAdapter(axios, { delayResponse: 500 });

  mockMovies(mock);
  mockUsers(mock);
  mockPosts(mock);
}

export default axios;
