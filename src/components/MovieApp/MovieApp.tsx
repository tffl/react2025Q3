import { type ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  movieApi,
  useGetAllMoviesQuery,
  useGetPopularMoviesQuery,
} from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { SelectedMoviesFlyout } from "../Flyout/SelectedMoviesFlyout";
import MoviesList from "../MoviesList/MoviesList";
import PagePagination from "../PagePagination/PagePagination";
import SearchBar from "../SearchBar/SearchBar";

type MoviePoster = {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
};

const MovieApp = () => {
  const dispatch = useDispatch();
  const [searchRequest, setSearchRequest] = useLocalStorage(
    "searchRequest",
    "",
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const hasSearch = searchRequest.trim().length > 0;

  const searchQueryParams = { query: searchRequest.trim(), page: currentPage };
  const popularQueryParams = { page: currentPage };

  const searchQuery = useGetAllMoviesQuery(searchQueryParams, {
    skip: !hasSearch,
    refetchOnFocus: true,
    pollingInterval: 5000,
  });

  const popularQuery = useGetPopularMoviesQuery(popularQueryParams, {
    skip: hasSearch,
    refetchOnFocus: true,
    pollingInterval: 5000,
  });

  const { data, isLoading, isError, error, refetch } = hasSearch
    ? {
        data: searchQuery.data,
        isLoading: searchQuery.isLoading,
        isError: searchQuery.isError,
        error: searchQuery.error,
        refetch: searchQuery.refetch,
      }
    : {
        data: popularQuery.data,
        isLoading: popularQuery.isLoading,
        isError: popularQuery.isError,
        error: popularQuery.error,
        refetch: popularQuery.refetch,
      };

  const errorMessage = (() => {
    if (isError && error) {
      if ("status" in error) return `Error: ${JSON.stringify(error)}`;
      if (error instanceof Error) return error.message;
    }
    return null;
  })();

  const movieResults: MoviePoster[] = (data?.results ?? []).map((movie) => ({
    ...movie,
    posterUrl: movie.posterUrl ?? null,
  }));

  const totalPages: number = data?.total_pages ?? 1;

  const searchSubmit = useCallback(() => {
    const userInput = searchRequest.trim();
    if (!userInput) return;

    setSearchRequest(userInput);
    setSearchParams({ page: "1" });
    void refetch();
  }, [searchRequest, setSearchRequest, setSearchParams, refetch]);

  const updateSearchRequest = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setSearchRequest(inputValue);

      if (!inputValue.trim()) {
        setSearchParams({ page: "1" });
        void refetch();
      }
    },
    [setSearchRequest, setSearchParams, refetch],
  );

  const noMoviesFound = movieResults.length === 0;

  const onPageChange = (page: number): void => {
    setSearchParams({ page: page.toString() });
  };

  const onRefreshClick = (): void => {
    dispatch(movieApi.util.invalidateTags(["Movies"]));
    void refetch();
  };

  return (
    <div className="search-results">
      <SearchBar
        value={searchRequest}
        onChange={updateSearchRequest}
        onSubmit={searchSubmit}
      />
      <button className="reload-btn" onClick={onRefreshClick}>
        Refresh
      </button>
      {isLoading ? (
        <p className="basic-text">Loading movies...</p>
      ) : isError ? (
        <ErrorMessage message={errorMessage || "No movies found"} />
      ) : noMoviesFound ? (
        <p className="basic-text">No movies found</p>
      ) : (
        <>
          <SelectedMoviesFlyout />
          <MoviesList movies={movieResults} />
          <PagePagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default MovieApp;
