import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Typography, createTheme } from "@mui/material";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button color="inherit" href="/">
            <Typography variant="h6" color="inherit" noWrap>
              Movie Review
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Posts />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
