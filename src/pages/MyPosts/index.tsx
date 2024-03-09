import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getMyPosts } from "../../services/posts";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

const MyPosts: React.FC = () => {
  const { data: posts } = useQuery(["myPosts"], () => getMyPosts());
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
            My Reviews
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {posts
            ? posts?.map((card) => <PostInfo key={card._id} {...card} />)
            : Array.apply(null, Array(6)).map(() => <PostSkeleton />)}
        </Grid>
      </Container>
      <Fab
        variant="extended"
        sx={{
          position: "absolute",
          bottom: 60,
          right: 60,
        }}
        onClick={() => navigate("/new-post")}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Review
      </Fab>
    </>
  );
};

export default MyPosts;
