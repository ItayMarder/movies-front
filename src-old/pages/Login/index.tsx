import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";
import {
  loginUser,
  getUserDetails,
  googleLoginUser,
} from "../../services/users";

const Login: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation(
    (user: { email: string; password: string }) => loginUser(user),
    {
      onSuccess: async (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        const userData = await getUserDetails();
        queryClient.setQueryData("user", { ...data, ...userData });

        navigate("/");
        toast.success("login successfully");
      },
      onError: () => {
        toast.error("Failed to login");
      },
    }
  );

  const { mutateAsync: googleLoginMutateAsync } = useMutation(
    (user: any) => googleLoginUser(user),
    {
      onSuccess: async (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        const userData = await getUserDetails();
        queryClient.setQueryData("user", { ...data, ...userData });

        navigate("/");
        toast.success("login successfully");
      },
      onError: () => {
        toast.error("Failed to login");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values) => {
      mutateAsync(values);
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
          id="email"
          name="email"
          label="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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

      <Box display="flex" justifyContent="center" marginTop="20px">
        <GoogleLogin
          onSuccess={googleLoginMutateAsync}
          onError={() => {
            toast.error("Failed to login with google");
          }}
        />
      </Box>
    </Container>
  );
};

export default Login;
