export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  profileImage?: string;
  imageUrl?: string;
}
import axios from "../axios";

const createUser = async (user: any) => {
  const form = new FormData();
  form.append("email", user.email);
  form.append("password", user.password);
  form.append("username", user.username);
  form.append("image", user.image);
  const { data } = await axios.post<User>("/auth/register", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const loginUser = async (user: { email: string; password: string }) => {
  const { data } = await axios.post<User>("/auth/login", user);
  return data;
};

const refreshUser = async (refreshToken: string) => {
  const { data } = await axios.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

const googleLoginUser = async (user: any) => {
  const { data } = await axios.post<User>("/auth/google-login", {
    token: user.credential,
  });
  return data;
};

const getUserDetails = async () => {
  const { data } = await axios.get<User>("/users/me");
  return data;
};

const logoutUser = async () => {
  const { data } = await axios.get("/auth/logout");
  return data;
};

const editUser = async (userData) => {
  const form = new FormData();
  form.append("email", userData.email);
  form.append("username", userData.username);
  form.append("image", userData.profileImage);
  const { data } = await axios.patch<User>("/users", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export {
  createUser,
  loginUser,
  logoutUser,
  getUserDetails,
  googleLoginUser,
  refreshUser,
  editUser,
};
