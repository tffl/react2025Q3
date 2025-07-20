import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { mockMovies } from "../../test-utils/mockMovies";

import MoviesList from "./MoviesList";

describe("MoviesList", () => {
    it("render movies list", () => {
        const { container } = render(<MoviesList movies={mockMovies} />);
        const cards = container.querySelectorAll(".movie-card");
        expect(cards.length).toBe(mockMovies.length);
    });

    it("not render anything if movies array is empty", () => {
        const { container } = render(<MoviesList movies={[]} />);
        const cards = container.querySelectorAll(".movie-card");
        expect(cards.length).toBe(0);
    });

});