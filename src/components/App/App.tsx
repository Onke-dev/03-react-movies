import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [nameMovie, setnameMovie] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (query: string) => {
    const date = await fetchMovies(query);
    setnameMovie(date);
  };

  const openModal = (movie: Movie) => {
    setSelectMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSearch={handleSubmit} />
      <MovieGrid movies={nameMovie} onSelect={(movie: Movie) => openModal(movie)} />
      {isModalOpen && selectMovie && (
        <MovieModal onClose={closeModal} movie={selectMovie} />
      )}
    </>
  );
}

export default App;
