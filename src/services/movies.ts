import axios from "axios";
import { User } from "./users";

export interface Movie {
  _id: string;
  name: string;
}

const getMovies = async (search: string) => {
  const { data } = await axios.get<{ description: Movie[] }>(
    `https://search.imdbot.workers.dev?q=${search || "a"}`
  );
  return data.description;
};

export { getMovies };
