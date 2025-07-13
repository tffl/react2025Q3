import type { MoviePoster } from '../api/api';
import { POSTER_PLACEHOLDER } from '../api/api';

function MovieCard({ movie }: { movie: MoviePoster }) {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl || POSTER_PLACEHOLDER} alt={movie.title} title={movie.title} className="movie-poster" />
      <h3>{movie.title}</h3>
      <p className="movie-description">{movie.overview}</p>
    </div>
  );
}

export default MovieCard;
