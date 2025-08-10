import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect } from "vitest";

import { store } from "../../store/store";
import { mockMovies } from "../../test-utils/mockMovies";

import MoviesList from "./MoviesList";

describe("MoviesList", () => {
  it("render movies list", () => {
    const { container } = render(
      <Provider store={store}>
        <MoviesList movies={mockMovies} />
      </Provider>,
    );
    const cards = container.querySelectorAll(".movie-card");
    expect(cards.length).toBe(mockMovies.length);
  });

  it("not render anything if movies array is empty", () => {
    const { container } = render(
      <Provider store={store}>
        <MoviesList movies={[]} />
      </Provider>,
    );
    const cards = container.querySelectorAll(".movie-card");
    expect(cards.length).toBe(0);
  });
});
