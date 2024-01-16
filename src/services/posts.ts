import axios from "../axios";
import { User } from "./users";

export interface Post {
  _id: string;
  owner: User;
  title: string;
  content: string;
  imagePath: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  owner: User;
  content: string;
}

const getPosts = async () => {
  const { data } = await axios.get<Post[]>("/posts");
  return data;
};

const getPost = async (postId: string) => {
  const { data } = await axios.get<Post>(`/posts/${postId}`);
  return data;
};

const createPost = async (post: Post) => {
  const { data } = await axios.post<Post>("/posts", post);
  return data;
};

export { getPosts, createPost, getPost };
