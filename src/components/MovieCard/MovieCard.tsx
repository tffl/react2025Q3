import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { MoviePoster } from "../../api/api";
import { POSTER_PLACEHOLDER } from "../../api/api";
import { movieSelectionToggle } from "../../store/selectedMoviesSlice";
import type { RootState, AppDispatch } from "../../store/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function MovieCard({ movie }: { movie: MoviePoster }) {
  const isSelected = useAppSelector((state) =>
    Boolean(state.selectedMovies.movies.find(m => m.id === movie.id))
  );

  return (
    <div className={`movie-card ${isSelected ? "selected" : ""}`}>
      <img
        src={movie.posterUrl || POSTER_PLACEHOLDER}
        alt={movie.title}
        title={movie.title}
        className="movie-poster"
      />
      <h3>{movie.title}</h3>
      <p className="movie-description">{movie.overview}</p>
      <label className="movie-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => useAppDispatch()(movieSelectionToggle(movie))}
        />
        Select movie
      </label>
    </div>
  );
}

export default MovieCard;