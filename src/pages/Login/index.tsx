import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import { getMovies } from "../../services/movies";
import { useNavigate } from "react-router-dom";
import { Post, createPost } from "../../services/posts";

const Login: React.FC = () => {
  const queryClient = useQueryClient();
  // const { data: movies } = useQuery(["getMovies"], () => getMovies());
  const navigate = useNavigate();

  // const { mutateAsync } = useMutation((post: any) => createPost(post), {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries("getPosts");
  //     navigate("/");
  //     toast.success("Created post successfully");
  //   },
  //   onError: (error: any) => {
  //     toast.error("Failed to create post");
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("username is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values) => {
      // mutateAsync(values);
    },
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="xs">
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Enter your credentials to login!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      <Button color="success" variant="contained" fullWidth sx={{ mt: 12 }}>
        Login with Google
      </Button>
    </Container>
  );
};

export default Login;
