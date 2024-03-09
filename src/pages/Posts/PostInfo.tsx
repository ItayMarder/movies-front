import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Post } from "../../services/posts";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
} from "@mui/material";
import { baseURL } from "../../axios";

const PostInfo: React.FC<Post> = ({
  movieName,
  _id,
  content,
  user,
  comments,
  imageName,
  imdbRating,
}) => {
  const navigate = useNavigate();

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
          action={
            <>
              <Chip
                color="primary"
                label={comments.length}
                sx={{ marginRight: "5px" }}
              />
              <Chip color="success" label={imdbRating || "?"} />
            </>
          }
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
          <Button size="small" onClick={() => navigate(`/post/${_id}`)}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostInfo;
