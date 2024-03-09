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
import { getMovies } from "../../services/movies";
import { useNavigate, useParams } from "react-router-dom";
import { Post, createComment, createPost, getPost } from "../../services/posts";

const NewComment: React.FC = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { data: post } = useQuery(["getPost", postId], () => getPost(postId!));

  const navigate = useNavigate();

  const { mutateAsync } = useMutation(
    (comment: any) => createComment(postId, comment.content),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getPost", postId]);
        navigate(`/post/${postId}`);
        toast.success("Created comment successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to create comment");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().trim().required("Content is required"),
    }),
    onSubmit: (values) => {
      mutateAsync(values);
    },
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Add your review!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          multiline
          rows={4}
          id="content"
          name="content"
          label="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewComment;
