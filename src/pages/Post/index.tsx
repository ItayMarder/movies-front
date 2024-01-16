import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { getPost } from "../../services/posts";
import { useNavigate, useParams } from "react-router-dom";
import { Post, createPost } from "../../services/posts";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const PostPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { data: post } = useQuery(["getPost", postId], () => getPost(postId!));
  console.log(post);

  const navigate = useNavigate();

  const {
    title,
    owner: { email },
    content,
    comments,
  } = post!;

  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
      <Typography variant="h3" align="center" color="text.primary" paragraph>
        {title}
      </Typography>
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        {content}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {email}
      </Typography>
      <br />
      <br />
      <Divider />
      {comments.map((comment) => {
        const { content, owner } = comment;
        return (
          <div>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              {content}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              {owner.email}
            </Typography>
            <Divider />
          </div>
        );
      })}
      <Fab
        variant="extended"
        sx={{
          position: "absolute",
          bottom: 60,
          right: 60,
        }}
        onClick={() => navigate(`/post/${postId!}/add-review`)}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Review
      </Fab>
    </Container>
  );
};

export default PostPage;
