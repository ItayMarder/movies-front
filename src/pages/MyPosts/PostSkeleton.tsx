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
import { getPost } from "../../services/posts";
import { useNavigate, useParams } from "react-router-dom";
import { Post, createPost, Comment } from "../../services/posts";
import {
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
import { AspectRatio } from "@mui/icons-material";

const PostSkeleton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary" disabled>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostSkeleton;
