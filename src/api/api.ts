import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import POSTER_PLACEHOLDER from "../assets/movie_placeholder.png";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

if (!API_KEY) {
  throw new Error("Can't find VITE_TMDB_API_KEY");
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185";

export { POSTER_PLACEHOLDER };

export type MovieCard = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
};

export type MoviePoster = MovieCard & {
  posterUrl: string | null;
};

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

export type MovieSearchParams = {
  query: string;
  page?: number;
};

function getPoster(posterPath?: string | null): string {
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

function mapMovieListResponse(response: MovieList): MovieApiResponse {
  return {
    results: mapMovies(response.results ?? []),
    total_pages: response.total_pages,
  };
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Movies'] as const,
  endpoints: (build) => ({
    getAllMovies: build.query<MovieApiResponse, MovieSearchParams>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          query,
          api_key: API_KEY,
          page,
        },
      }),
      transformResponse: mapMovieListResponse,
      providesTags: (_result, _error, arg: MovieSearchParams) => [
        { type: 'Movies', id: `search-${arg.query}-${arg.page ?? 1}` },
      ],
    }),
    getPopularMovies: build.query<MovieApiResponse, { page?: number }>({
      query: ({ page = 1 } = {}) => ({
        url: '/movie/popular',
        params: {
          api_key: API_KEY,
          page,
        },
      }),
      transformResponse: mapMovieListResponse,
      providesTags: (_result, _error, arg?: { page?: number }) => [
        { type: 'Movies', id: `popular-${arg?.page ?? 1}` },
      ],
    }),
  }),
});

export const { useGetAllMoviesQuery, useGetPopularMoviesQuery } = movieApi;