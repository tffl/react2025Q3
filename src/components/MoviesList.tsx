import type { MoviePoster } from "../api/api";

import MovieCard from "./MovieCard";

export default function MoviesList({ movies }: { movies: MoviePoster[] }) {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
