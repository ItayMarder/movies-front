import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { getPosts } from "../../services/posts";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import PostInfo from "./PostInfo";
import PostSkeleton from "./PostSkeleton";

const Posts: React.FC = () => {
  const { data: posts } = useQuery(["getPosts"], () => getPosts());
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Movie Center
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Get the latest reviews here!
          </Typography>
          {!queryClient.getQueryData("user") && (
            <>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Login / Signup to add your own reviews!
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="outlined" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </Stack>
            </>
          )}
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="xl">
        <Grid container spacing={4}>
          {posts
            ? posts?.map((card) => <PostInfo key={card._id} {...card} />)
            : Array.apply(null, Array(6)).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
        </Grid>
      </Container>
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
        onClick={() => navigate("/new-post")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Review
      </Fab>
    </>
  );
};

export default Posts;
