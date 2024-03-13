import React from "react";
import { useQuery } from "react-query";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getPost } from "../../services/posts";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CommentInfo from "./CommentInfo";
import { baseURL } from "../../axios";
import GradeIcon from "@mui/icons-material/Grade";

const PostPage: React.FC = () => {
  const { postId } = useParams();

  const { data: post } = useQuery(["getPost", postId], () => getPost(postId!));

  const navigate = useNavigate();

  if (!post)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="success" size={100} />
      </Box>
    );

  const { movieName, user, content, comments, imageName, imdbRating } = post!;

  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
      <Box
        sx={{ display: "flex", gap: 4, width: "100%", alignItems: "center" }}
      >
        <Avatar
          src={
            user.imageUrl
              ? `${user.imageUrl}`
              : `${baseURL}/images/${user.profileImage}`
          }
          animation="wave"
          variant="circular"
          sx={{ width: 50, height: 50 }}
        />
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {user.username}
        </Typography>
        <Tooltip
          title={
            <Typography placement="top" arrow>
              IMDB Rating
            </Typography>
          }
          arrow
        >
          <Chip
            color="primary"
            label={imdbRating || "?"}
            sx={{ marginRight: "5px", alignSelf: "center", ml: "auto" }}
            icon={<GradeIcon />}
          />
        </Tooltip>
      </Box>

      <Typography variant="h3" align="center" color="text.primary" paragraph>
        {movieName}
      </Typography>
      <Box
        component="img"
        sx={{
          boxShadow: "10px 10px 8px #888888",
          maxHeight: "400px",
          m: "0 auto",
        }}
        src={`${baseURL}/images/${imageName}`}
      />
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontWeight: "bold", mt: 3 }}
          variant="h4"
          align="center"
          color="text.secondary"
          paragraph
        >
          Review:
        </Typography>
        <Typography
          sx={{ mt: 3, ml: 2 }}
          variant="h5"
          align="left"
          color="text.secondary"
          paragraph
        >
          {content}
        </Typography>
      </Box>

      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {comments.map((comment) => {
          const { content, user, _id, date } = comment;
          return (
            <CommentInfo content={content} user={user} _id={_id} date={date} />
          );
        })}
      </Box>
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 60,
          right: 60,
        }}
        onClick={() => navigate(`/post/${postId!}/add-comment`)}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Comment
      </Fab>
    </Container>
  );
};

export default PostPage;
