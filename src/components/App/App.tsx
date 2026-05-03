import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [nameMovie, setnameMovie] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLodaing, setIsLodaing] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (query: string) => {
    try {
      setIsLodaing(true);
      const date = await fetchMovies(query);
      if (date.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setnameMovie(date);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLodaing(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <MovieGrid
        movies={nameMovie}
        onSelect={(movie: Movie) => openModal(movie)}
      />
      {isLodaing && <Loader />}
      {isModalOpen && selectMovie && (
        <MovieModal onClose={closeModal} movie={selectMovie} />
      )}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
