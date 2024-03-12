import { Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme } from "@mui/material";
import { toast } from "react-toastify";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import NewComment from "./pages/NewComment";
import MyProfile from "./pages/MyProfile";
import MyPosts from "./pages/MyPosts";
import { QueryObserver, useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import { User, getUserDetails, logoutUser } from "./services/users";
import PostEdit from "./pages/Posts/PostEdit";

const App = () => {
  const defaultTheme = createTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const observer = new QueryObserver(queryClient, { queryKey: ["user"] });

  observer.subscribe((result) => {
    setUser(result.data as User);
  });

  const { mutateAsync: logoutMutateAsync } = useMutation(() => logoutUser(), {
    onSuccess: () => {
      queryClient.setQueryData("user", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");

      toast.success("logout successfully");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        queryClient.setQueryData("user", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");

        toast.success("logout successfully");
      } else {
        toast.error("Failed to logout");
      }
    },
  });

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

        setUser(userData);
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
        {user && (
          <Button
            color="error"
            variant="contained"
            sx={{ position: "fixed", bottom: 50, left: 50 }}
            onClick={logoutMutateAsync}
          >
            Log Out
          </Button>
        )}
      </>

      <Routes>
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/post/:postId/add-comment" element={<NewComment />} />
        <Route path="/post/:postId/edit" element={<PostEdit />} />
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
