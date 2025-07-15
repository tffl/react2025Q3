import { Component, type ChangeEvent } from "react";

import type { MoviePoster } from "../api/api";
import { getAllMovies, getPopularMovies } from "../api/api";

import ErrorMessage from "./1_ErrorMessage";
import MoviesList from "./1_MoviesList";
import SearchBar from "./1_SearchBar";

type MovieAppState = {
  movieResults: MoviePoster[];
  searchRequest: string;
  isLoading: boolean;
  errorMessage: string | null;
};

export class MovieApp extends Component<object, MovieAppState> {
  state: MovieAppState = {
    movieResults: [],
    searchRequest: "",
    isLoading: false,
    errorMessage: null,
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem("searchRequest") || "";
    this.setState({ searchRequest: savedSearch }, () => {
      void this.fetchMovies();
    });
  }

  fetchMovies = async () => {
    this.setState({ isLoading: true, errorMessage: null });

    try {
      const { searchRequest } = this.state;
      let movieResults;

      if (searchRequest.trim()) {
        movieResults = await getAllMovies(searchRequest);
      } else {
        movieResults = await getPopularMovies();
      }

      this.setState({ movieResults });
    } catch (error) {
      this.setState({ errorMessage: (error as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  searchSubmit = () => {
    const userInput = this.state.searchRequest.trim();
    if (!userInput) return;

    localStorage.setItem("searchRequest", userInput);
    void this.fetchMovies();
  };

  updateSearchRequest = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ searchRequest: value }, () => {
      if (!value.trim().length) {
        void this.fetchMovies();
      }
    });
  };

  render() {
    const { movieResults, searchRequest, isLoading, errorMessage } = this.state;
    const noMoviesFound =
      !isLoading && !errorMessage && movieResults.length === 0;

    return (
      <div className="search-results">
        <SearchBar
          value={searchRequest}
          onChange={this.updateSearchRequest}
          onSubmit={this.searchSubmit}
        />
        {(() => {
          if (isLoading) return <p className="basic-text">Loading movies...</p>;
          if (errorMessage) return <ErrorMessage message={errorMessage} />;
          if (noMoviesFound)
            return <p className="basic-text">No movies found</p>;
          return <MoviesList movies={movieResults} />;
        })()}
      </div>
    );
  }
}
export default MovieApp;
