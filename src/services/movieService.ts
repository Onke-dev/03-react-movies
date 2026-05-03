import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

const fetchMovies = async (query: string) => {
  const { data } = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTk4ZjU1OGM3MzNmZjUzZTVkZTZkN2M2OWFlNzkxNiIsIm5iZiI6MTc3NzcyNzU0NS4xODksInN1YiI6IjY5ZjVmODM5YzBlNGUwZTcwMzJhNDQ5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HLdDQNdHzrLM5sl57zXNkEgzSplNs4JCQdT_yze3ysc`,
      },
    },
  );
  return data.results;
};

export default fetchMovies;
