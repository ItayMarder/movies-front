import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/users";
import { Box, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email is required"),
      username: Yup.string().required("username is required"),
      password: Yup.string().required("password is required"),
      image: Yup.mixed().required("image is required"),
    }),
    onSubmit: (values) => {
      mutateAsync(values);
    },
  });

  const { mutateAsync } = useMutation((user: any) => createUser(user), {
    onSuccess: (data) => {
      navigate("/");
      toast.success("Created user successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create user");
    },
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="xs">
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Create an Account!
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
        <Box
          display="flex"
          justifyContent="center"
          marginTop="10px"
          flexDirection="column"
          alignItems="center"
        >
          <Grid item>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload avatar
              <VisuallyHiddenInput
                type="file"
                id="image"
                name="image"
                label="image"
                onBlur={formik.handleBlur}
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                  }
                }}
                helperText={formik.touched.image && formik.errors.image}
              />
            </Button>
          </Grid>
          <Grid item>
            {formik.errors.image && (
              <>
                <br />
                <span id="error">{formik.errors.image}</span>
                <br />
              </>
            )}
          </Grid>
        </Box>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          SignUp
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
