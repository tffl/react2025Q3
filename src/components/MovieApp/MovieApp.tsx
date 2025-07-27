import { useState, useEffect, type ChangeEvent } from "react";

import type { MoviePoster } from "../../api/api";
import { getAllMovies, getPopularMovies } from "../../api/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MoviesList from "../MoviesList/MoviesList";
import SearchBar from "../SearchBar/SearchBar";

const MovieApp = () => {
  const [movieResults, setMovieResults] = useState<MoviePoster[]>([]);
  const [searchRequest, setSearchRequest] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadSearch = () => {
      const savedSearch = localStorage.getItem("searchRequest");
      setSearchRequest(savedSearch ?? "");
    };

    loadSearch();
  }, []);

  useEffect(() => {
    void fetchMovies();
  }, [searchRequest]);

  const fetchMovies = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const searchQuery = searchRequest.trim();
      const movieResults = searchQuery
        ? await getAllMovies(searchQuery)
        : await getPopularMovies();

      setMovieResults(movieResults);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchSubmit = (): void => {
    const userInput = searchRequest.trim();
    if (!userInput) return;

    localStorage.setItem("searchRequest", userInput);
    setSearchRequest(userInput);
  };

  const updateSearchRequest = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchRequest(value);

    if (!value.trim()) {
      void fetchMovies();
    }
  };

  const noMoviesFound =
    !isLoading && !errorMessage && movieResults.length === 0;

  return (
    <div className="search-results">
      <SearchBar
        value={searchRequest}
        onChange={updateSearchRequest}
        onSubmit={searchSubmit}
      />
      {isLoading ? (
        <p className="basic-text">Loading movies...</p>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : noMoviesFound ? (
        <p className="basic-text">No movies found</p>
      ) : (
        <MoviesList movies={movieResults} />
      )}
    </div>
  );
};

export default MovieApp;