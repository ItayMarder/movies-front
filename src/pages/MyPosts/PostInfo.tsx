import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deletePost } from "../../services/posts";
import { Post } from "../../services/posts";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import { baseURL } from "../../axios";

const PostInfo: React.FC<Post> = ({
  movieName,
  _id,
  content,
  user,
  imageName,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMutateAsync } = useMutation(
    () => deletePost(_id),
    {
      onSuccess: () => {
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
              src={`${baseURL}/images/${user.profileImage}`}
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
          image={`${baseURL}/images/${imageName}`}
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
