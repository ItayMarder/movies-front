import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid, Typography, createTheme } from "@mui/material";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import NewComment from "./pages/NewComment";
import MyProfile from "./pages/MyProfile";
import MyPosts from "./pages/MyPosts";
import { QueryObserver, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { getUserDetails } from "./services/users";

const App = () => {
  const defaultTheme = createTheme();
  const [user, setUser] = useState<any>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const setUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const userData = await getUserDetails();

        queryClient.setQueryData("user", {
          accessToken,
          refreshToken,
          ...userData,
        });
        console.log(queryClient.getQueryData("user"));
      }
    };

    setUserData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <TopBar />
          </Toolbar>
        </AppBar>
      </>

      <Routes>
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/post/:postId/add-comment" element={<NewComment />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/my" element={<MyPosts />} />

        <Route path="/" element={<Posts />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
