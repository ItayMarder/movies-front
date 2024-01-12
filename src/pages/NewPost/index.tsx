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
import { useNavigate } from "react-router-dom";
import { Post, createPost } from "../../services/posts";

const NewPost: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: movies } = useQuery(["getMovies"], () => getMovies());
  const navigate = useNavigate();

  const { mutateAsync } = useMutation((post: any) => createPost(post), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getPosts");
      navigate("/");
      toast.success("Created post successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create post");
    },
  });

  const formik = useFormik({
    initialValues: {
      review: "",
      movie: null,
    },
    validationSchema: Yup.object().shape({
      review: Yup.string().trim().required("Review is required"),
      movie: Yup.object().required("Movie is required"),
    }),
    onSubmit: (values) => {
      mutateAsync(values);
    },
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Search a movie and add your review!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          fullWidth
          options={movies || []}
          value={formik.values.movie}
          onChange={(_, newValue) => formik.setFieldValue("movie", newValue)}
          getOptionLabel={(o: any) => o.name}
          renderInput={(params) => (
            <TextField
              {...params}
              id="movie"
              name="movie"
              error={formik.touched.movie && Boolean(formik.errors.movie)}
              helperText={formik.touched.movie && formik.errors.movie}
              label="Movie"
            />
          )}
        />

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          multiline
          rows={4}
          id="review"
          name="review"
          label="review"
          value={formik.values.review}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
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

export default NewPost;
