import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "vitest";

import { store } from "../../store/store";
import { mockMovies } from "../../test-utils/mockMovies";


import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const movie = mockMovies[0];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MovieCard movie={movie} />
      </Provider>
    );
  });

  it("render correct movie image", () => {
    const img = screen.getByRole("img", { name: movie.title });
    expect(img.getAttribute("src")).toBe(movie.posterUrl);
    expect(img.getAttribute("alt")).toBe(movie.title);
  });

  it("render movie title", () => {
    expect(screen.getByText(movie.title)).toBeTruthy();
  });

  it("render movie description", () => {
    expect(screen.getByText(movie.overview)).toBeTruthy();
  });
});
