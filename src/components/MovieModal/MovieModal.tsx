import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalResponse {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalResponse) {
  return createPortal(
    <>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>
          <button
            className={css.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="movie_title"
            className={css.image}
          />
          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date: {movie.release_date}</strong>
            </p>
            <p>
              <strong>Rating: {movie.vote_average}</strong>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default MovieModal;
