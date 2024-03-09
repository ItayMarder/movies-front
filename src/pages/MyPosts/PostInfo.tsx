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
import { deletePost, getPost } from "../../services/posts";
import { useNavigate, useParams } from "react-router-dom";
import { Post, createPost, Comment } from "../../services/posts";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const PostInfo: React.FC<Post> = ({
  movieName,
  _id,
  content,
  user,
  imageName,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMutateAsync } = useMutation(
    () => deletePost(_id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getPosts");
        queryClient.invalidateQueries("myPosts");
        toast.success("Deleted post successfully");
      },
      onError: (error: any) => {
        toast.error("Failed to delete post");
      },
    }
  );

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:3000/images/${user.profileImage}`}
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={<Typography>{movieName}</Typography>}
          subheader={<Typography>{user.username}</Typography>}
        />
        <CardMedia
          component="div"
          sx={{ height: "190px" }}
          image={`http://localhost:3000/images/${imageName}`}
        />
        <CardContent>
          <React.Fragment>
            <Typography>{content}</Typography>
          </React.Fragment>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {}}>
            Edit
          </Button>
          <Button size="small" onClick={deleteMutateAsync}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostInfo;
