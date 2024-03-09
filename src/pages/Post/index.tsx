import React from "react";
import { useQuery } from "react-query";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getPost } from "../../services/posts";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import CommentInfo from "./CommentInfo";

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

  const {
    movieName,
    user: { username },
    content,
    comments,
  } = post!;

  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
      <Typography variant="h3" align="center" color="text.primary" paragraph>
        {movieName}
      </Typography>
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        {content}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {username}
      </Typography>
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
          position: "absolute",
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
