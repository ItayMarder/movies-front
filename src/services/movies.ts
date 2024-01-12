import axios from "../axios";
import { User } from "./users";

export interface Movie {
  _id: string;
  name: string;
}

const getMovies = async () => {
  const { data } = await axios.get<Movie[]>("/movies");
  return data;
};

export { getMovies };
