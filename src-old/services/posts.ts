import axios from "../axios";
import { User } from "./users";

export interface Post {
  _id: string;
  user: User;
  movieName: string;
  content: string;
  imageName: string;
  comments: Comment[];
  imdbRating: number;
}

export interface Comment {
  _id: string;
  user: User;
  content: string;
  date: Date;
}

const getPosts = async () => {
  const { data } = await axios.get<Post[]>("/posts");

  return data;
};

const getMyPosts = async () => {
  const { data } = await axios.get<Post[]>("/posts/my");

  return data;
};

const getPost = async (postId: string) => {
  const { data } = await axios.get<Post>(`/posts/${postId}`);

  return data;
};

const editPost = async (postId, post) => {
  const form = new FormData();
  // form.append("movieName", post.movieName);
  if (post.content) form.append("content", post.content);
  if (post.imageName && typeof post.imageName !== "string") {
    form.append("image", post.imageName);
  }
  const { data } = await axios.patch<User>("/posts/" + postId, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const createPost = async (post: any) => {
  const form = new FormData();
  form.append("movieName", post.movie["#TITLE"]);
  form.append("content", post.content);
  form.append("imdbId", post.movie["#IMDB_ID"]);
  form.append("image", post.image);
  const { data } = await axios.post<User>("/posts", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const deletePost = async (postId: string) => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);

  return data;
};

const createComment = async (postId: string, content: string) => {
  const { data } = await axios.put<Post>(`/posts/${postId}/comment`, {
    content,
  });

  return data;
};
export {
  getPosts,
  createPost,
  getPost,
  getMyPosts,
  deletePost,
  createComment,
  editPost,
};
