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
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const CommentInfo: React.FC<Comment> = ({ content, user, date }) => {
  console.log("user", user);

  return (
    <Card
      variant="outlined"
      sx={{ width: "max(400px, 60%)", borderRadius: 0, "--Card-radius": 0 }}
    >
      <CardContent>
        <Box display="flex" gap="20px">
          <Avatar
            src={`http://localhost:3000/images/${user.profileImage}`}
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Box>
            <Typography variant="body1" color="text.secondary">
              {user.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {new Date(date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent sx={{ gap: 0.5, mt: 1 }}>
        <Typography variant="body1" color="text.primary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentInfo;
