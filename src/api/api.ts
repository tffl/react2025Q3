const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

if (!API_KEY) {
  throw new Error("Can't find VITE_TMDB_API_KEY");
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185";

import POSTER_PLACEHOLDER from "../assets/movie_placeholder.png";
export { POSTER_PLACEHOLDER };

export type MovieCard = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
};

export type MoviePoster = {
  posterUrl: string | null;
} & MovieCard;

export type MovieList = {
  results: MovieCard[];
  page: number;
  total_results: number;
  total_pages: number;
};

export type MovieApiResponse = {
  results: MoviePoster[];
  total_pages: number;
};

async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error(`Client error (${response.status}): ${response.statusText}`);
    }
    throw new Error("Unexpected server response");
  }

  return response.json() as Promise<T>;
}

function getPoster(posterPath: string | null | undefined): string {
  return posterPath
    ? `${POSTER_BASE_URL}${POSTER_SIZE}${posterPath}`
    : POSTER_PLACEHOLDER;
}

function mapMovies(movies: MovieCard[]): MoviePoster[] {
  return movies.map((movie) => ({
    ...movie,
    posterUrl: getPoster(movie.poster_path),
  }));
}

export async function getAllMovies(query: string, page = 1): Promise<MovieApiResponse> {
  const url = new URL(`${API_BASE_URL}/search/movie`);
  url.searchParams.set("query", query);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("page", page.toString());

  const data = await fetchAPI<MovieList>(url.toString());

  return {
    results: mapMovies(data.results ?? []),
    total_pages: data.total_pages,
  };
}

export async function getPopularMovies(page = 1): Promise<MovieApiResponse> {
  const url = new URL(`${API_BASE_URL}/movie/popular`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("page", page.toString());

  const data = await fetchAPI<MovieList>(url.toString());

  return {
    results: mapMovies(data.results ?? []),
    total_pages: data.total_pages,
  };
}