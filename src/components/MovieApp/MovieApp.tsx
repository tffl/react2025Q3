import {
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
} from "react";
import { useSearchParams } from "react-router-dom";

import { getAllMovies, getPopularMovies } from "../../api/api";
import type { MoviePoster, MovieApiResponse } from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MoviesList from "../MoviesList/MoviesList";
import PagePagination from "../PagePagination/PagePagination";
import SearchBar from "../SearchBar/SearchBar";

const MovieApp = () => {
  const [movieResults, setMovieResults] = useState<MoviePoster[]>([]);
  const [searchRequest, setSearchRequest] = useLocalStorage("searchRequest", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const searchQuery = searchRequest.trim();
      const movieResults: MovieApiResponse = searchQuery
        ? await getAllMovies(searchQuery, currentPage)
        : await getPopularMovies(currentPage);

      setMovieResults(movieResults.results);
      setTotalPages(movieResults.total_pages);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [searchRequest, currentPage]);

  useEffect(() => {
    void fetchMovies();
  }, [fetchMovies]);

  const searchSubmit = (): void => {
    const userInput = searchRequest.trim();
    if (!userInput) return;

    setSearchRequest(userInput);
    setSearchParams({ page: "1" });
  };

  const updateSearchRequest = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setSearchRequest(inputValue);

    if (!inputValue.trim()) {
      setSearchParams({ page: "1" });
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
        <>
          <MoviesList movies={movieResults} />
          <PagePagination
            currentPage={currentPage}
            onPageChange={(page) => setSearchParams({ page: page.toString() })}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default MovieApp;