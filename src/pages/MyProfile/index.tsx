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
import { editUser, getUserDetails, logoutUser } from "../../services/users";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { Box, Grid } from "@mui/material";

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

const MyProfile: React.FC = () => {
  const queryClient = useQueryClient();
  // const { data: movies } = useQuery(["getMovies"], () => getMovies());
  const navigate = useNavigate();
  const userData = queryClient.getQueryData("user");
  console.log(userData);

  const { mutateAsync: editMutateAsync } = useMutation(
    (user) => editUser(user),
    {
      onSuccess: async (data) => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("accessToken");

        const userData = await getUserDetails();

        queryClient.setQueryData("user", {
          accessToken,
          refreshToken,
          ...userData,
        });

        // navigate("/");
        toast.success("Edited user successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to edit user");
      },
    }
  );

  const { mutateAsync: logoutMutateAsync } = useMutation(() => logoutUser(), {
    onSuccess: (data) => {
      queryClient.setQueryData("user", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
      // console.log(queryClient.setQueryData("user"));

      toast.success("logout successfully");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        queryClient.setQueryData("user", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");

        toast.success("logout successfully");
      } else {
        toast.error("Failed to logout");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: userData?.email || "",
      username: userData?.username || "",
      profileImage: userData?.profileImage || "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("email is required"),
      username: Yup.string().required("username is required"),
      // password: Yup.string().required("password is required"),
      profileImage: Yup.mixed().required("image is required"),
    }),
    onSubmit: (values) => {
      editMutateAsync(values);
    },
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="xs">
      <Button
        color="error"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={logoutMutateAsync}
      >
        Logout
      </Button>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        marginTop="80px"
      >
        Edit Your Account
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
              {formik.values.profileImage.name ??
                formik.values.profileImage ??
                "Upload image"}
              <VisuallyHiddenInput
                type="file"
                id="profileImage"
                name="profileImage"
                label="profileImage"
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // accept="image/png, .svg"
                onChange={(e) => {
                  // Object is possibly null error w/o check
                  if (e.currentTarget.files) {
                    console.log(e.currentTarget.files[0]);

                    formik.setFieldValue(
                      "profileImage",
                      e.currentTarget.files[0]
                    );
                  }
                }}
                // error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={
                  formik.touched.profileImage && formik.errors.profileImage
                }
              />
            </Button>
          </Grid>
          <Grid item>
            {formik.errors.profileImage && (
              <>
                <br />
                <span id="error">{formik.errors.profileImage}</span>
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
          Save
        </Button>
      </form>
    </Container>
  );
};

export default MyProfile;
