import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Post, editPost, getPost } from "../../services/posts";
import { Box, Container, Grid, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { useFormik } from "formik";
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

const PostEdit: React.FC = ({}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { data: post } = useQuery(["getPost", postId], () => getPost(postId!));

  console.log(post);

  const { mutateAsync } = useMutation(
    (postData) => editPost(postId, postData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getPosts");
        queryClient.invalidateQueries("getPost");
        queryClient.invalidateQueries(["getPost", postId]);
        queryClient.invalidateQueries("myPosts");
        navigate("/");

        toast.success("edited successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to edit");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      content: post?.content || "",
      imageName: post?.imageName || "",
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required("content is required"),
      imageName: Yup.mixed().required("imageName is required"),
    }),
    onSubmit: (values) => {
      mutateAsync(values);
    },
  });

  return (
    <Container sx={{ py: 2 }} maxWidth="xs">
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        marginTop="80px"
      >
        Edit Your Review
      </Typography>
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "10px 10px 8px #888888",
        }}
        component="img"
        src={
          formik.values.imageName
            ? URL.createObjectURL(formik.values.imageName)
            : post?.imageName
            ? `${baseURL}/images/${post.imageName}`
            : ""
        }
      />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          id="content"
          name="content"
          label="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
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
              {formik.values.imageName.name ??
                formik.values.imageName ??
                "Upload image"}
              <VisuallyHiddenInput
                type="file"
                id="imageName"
                name="imageName"
                label="imageName"
                onBlur={formik.handleBlur}
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    formik.setFieldValue("imageName", e.currentTarget.files[0]);
                  }
                }}
                helperText={formik.touched.imageName && formik.errors.imageName}
              />
            </Button>
          </Grid>
          <Grid item>
            {formik.errors.imageName && (
              <>
                <br />
                <span id="error">{formik.errors.imageName}</span>
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

export default PostEdit;
