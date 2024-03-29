import React from "react";
import { QueryObserver, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { User, editUser, getUserDetails } from "../../services/users";
import { Box, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { baseURL } from "../../axios";

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
  const navigate = useNavigate();
  const userData = queryClient.getQueryData<User>("user");

  const { mutateAsync: editMutateAsync } = useMutation(
    (user: Partial<User>) => editUser(user),
    {
      onSuccess: async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("accessToken");

        const userData = await getUserDetails();

        queryClient.setQueryData("user", {
          accessToken,
          refreshToken,
          ...userData,
        });

        toast.success("Edited user successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to edit user");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: userData?.email || "",
      username: userData?.username || "",
      profileImage: userData?.profileImage || "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string(),
      username: Yup.string(),
      profileImage: Yup.mixed(),
    }),
    onSubmit: (values: any) => {
      const updatedFields: any = {};
      Object.keys(values).forEach((key: string) => {
        if (values[key] !== formik.initialValues[key]) {
          updatedFields[key] = values[key];
        }
      });
      editMutateAsync(updatedFields as Partial<User>);
    },
    enableReinitialize: true,
  });

  return (
    <Container sx={{ py: 8 }} maxWidth="xs">
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        marginTop="50px"
      >
        Edit Your Account
      </Typography>
      <Box
        component="img"
        sx={{
          border: "1px solid black",
          overflow: "hidden",
          m: "0 auto",
          width: 200,
          height: 200,
          borderRadius: "50%",
          mb: 2,
          boxShadow: "10px 10px 8px #888888",
        }}
        src={
          formik?.values.profileImage && typeof formik?.values.profileImage !== 'string'
            ? URL.createObjectURL(formik?.values.profileImage)
            : userData?.imageUrl ||
              `${baseURL}/images/${userData?.profileImage}` ||
              "/public/default-avatar.jpg"
        }
      />
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
                // label="profileImage"
                onBlur={formik.handleBlur}
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    formik.setFieldValue(
                      "profileImage",
                      e.currentTarget.files[0]
                    );
                  }
                }}
                // helperText={
                //   formik.touched.profileImage && formik.errors.profileImage
                // }
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
