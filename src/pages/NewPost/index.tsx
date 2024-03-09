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

const NewPost: React.FC = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = React.useState("");

  const { data: movies } = useQuery(["getMovies", inputValue], () =>
    getMovies(inputValue)
  );
  console.log("movies", movies);

  const navigate = useNavigate();

  const { mutateAsync } = useMutation((post: any) => createPost(post), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getPosts"]);
      queryClient.invalidateQueries(["myPosts"]);
      navigate("/");
      toast.success("Created post successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create post");
    },
  });

  const formik = useFormik({
    initialValues: {
      content: "",
      movie: null,
      image: null,
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().trim().required("content is required"),
      movie: Yup.object().required("Movie is required"),
      image: Yup.mixed().required("image is required"),
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
          isOptionEqualToValue={(option, value) =>
            option["#TITLE"] === value["#TITLE"]
          }
          filterOptions={(x) => x}
          onChange={(event: any, newValue: any) => {
            formik.setFieldValue("movie", newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={(o: any) => o["#TITLE"]}
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
              Upload image
              <VisuallyHiddenInput
                type="file"
                id="image"
                name="image"
                label="image"
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // accept="image/png, .svg"
                onChange={(e) => {
                  // Object is possibly null error w/o check
                  if (e.currentTarget.files) {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                  }
                }}
                // error={formik.touched.image && Boolean(formik.errors.image)}
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
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default NewPost;
