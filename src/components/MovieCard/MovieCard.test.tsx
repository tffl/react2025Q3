import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { mockMovies } from "../../test-utils/mockMovies";

import MovieCard from "./MovieCard";

describe("MovieCard", () => {
    const movie = mockMovies[0];

    beforeEach(() => {
        render(<MovieCard movie={movie} />);
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
