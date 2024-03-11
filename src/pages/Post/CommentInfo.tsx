import React from "react";

import Typography from "@mui/material/Typography";
import { Comment } from "../../services/posts";
import { Avatar, Box, Card, CardContent } from "@mui/material";
import { baseURL } from "../../axios";

const CommentInfo: React.FC<Comment> = ({ content, user, date }) => {
  return (
    <Card
      variant="outlined"
      sx={{ width: "max(400px, 60%)", borderRadius: 0, "--Card-radius": 0 }}
    >
      <CardContent>
        <Box display="flex" gap="20px">
          <Avatar
            src={
              user.imageUrl
                ? user.imageUrl
                : `${baseURL}/images/${user.profileImage}` ||
                  "public/default-avatar.jpg"
            }
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
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentInfo;
