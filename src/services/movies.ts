import axios from "../axios";
import { User } from "./users";

export interface Movie {
  _id: string;
  name: string;
}

const getMovies = async (search: string) => {
  const { data } = await axios.get<{ description: Movie[] }>(
    `/movies?q=${search || "a"}`
  );
  return data.description;
};

export { getMovies };
