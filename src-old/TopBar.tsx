import { useNavigate } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid, Typography, createTheme } from "@mui/material";
import { useQueryClient, QueryObserver } from "react-query";
import { getUserDetails } from "./services/users";
import { useEffect, useState } from "react";

const TopBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);

  const observer = new QueryObserver(queryClient, { queryKey: ["user"] });

  observer.subscribe((result) => {
    setUser(result.data);
  });

  return (
    <Toolbar sx={{ width: "100%" }}>
      <Grid justifyContent={"space-between"} display="flex" width="100%">
        <Grid item>
          <Button color="inherit" onClick={() => navigate("/")}>
            <Typography variant="h6" color="inherit" noWrap>
              Movie Center
            </Typography>
          </Button>
        </Grid>
        {user && (
          <Grid item>
            <Button color="inherit" onClick={() => navigate("/my")}>
              <Typography variant="h6" color="inherit" noWrap>
                My Posts
              </Typography>
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              <Typography variant="h6" color="inherit" noWrap>
                My Profile
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Toolbar>
  );
};

export default TopBar;
