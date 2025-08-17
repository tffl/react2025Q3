import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import * as redux from "react-redux";
import { useSearchParams } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  movieApi,
  useGetAllMoviesQuery,
  useGetPopularMoviesQuery,
} from "../../api/api";
import useLocalStorage from "../../hooks/useLocalStorage";

import MovieApp from "./MovieApp";

type AllMoviesRes = ReturnType<typeof useGetAllMoviesQuery>;
type PopularMoviesRes = ReturnType<typeof useGetPopularMoviesQuery>;

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("../../api/api", () => ({
  movieApi: {
    util: { invalidateTags: vi.fn(() => ({ type: "invalidate" })) },
  },
  useGetAllMoviesQuery: vi.fn(),
  useGetPopularMoviesQuery: vi.fn(),
  POSTER_PLACEHOLDER: "",
}));

vi.mock("react-router-dom", () => ({ useSearchParams: vi.fn() }));

vi.mock("../../hooks/useLocalStorage", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("MovieApp component", () => {
  const mockAll = useGetAllMoviesQuery as unknown as ReturnType<typeof vi.fn>;
  const mockPopular = useGetPopularMoviesQuery as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockSearchParams = useSearchParams as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockLocalStorage = useLocalStorage as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockDispatchHook = redux.useDispatch as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockSelectorHook = redux.useSelector as unknown as ReturnType<
    typeof vi.fn
  >;

  const dispatchSpy = vi.fn();

  const defaultParams: [
    URLSearchParams,
    (
      nextInit?: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
    ) => void,
  ] = [new URLSearchParams([["page", "1"]]), vi.fn()];

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatchHook.mockReturnValue(dispatchSpy);
    mockSelectorHook.mockReturnValue(false);
  });

  function setup({
    lsValue = "",
    setLs = vi.fn(),
    params = defaultParams,
    all = {},
    popular = {},
  }: {
    lsValue?: string;
    setLs?: (v: string) => void;
    params?: [
      URLSearchParams,
      (
        nextInit?:
          | URLSearchParams
          | ((prev: URLSearchParams) => URLSearchParams),
      ) => void,
    ];
    all?: Partial<AllMoviesRes>;
    popular?: Partial<PopularMoviesRes>;
  } = {}) {
    mockLocalStorage.mockReturnValue([lsValue, setLs]);
    mockSearchParams.mockReturnValue(params);
    mockAll.mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      error: undefined,
      refetch: vi.fn(),
      ...all,
    } as AllMoviesRes);
    mockPopular.mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      error: undefined,
      refetch: vi.fn(),
      ...popular,
    } as PopularMoviesRes);
  }

  describe("Loading and error states", () => {
    it("should show loading when popular movies are loading", () => {
      setup({ popular: { isLoading: true } });
      render(<MovieApp />);
      expect(screen.getByText("Loading movies...")).toBeInTheDocument();
    });

    it("should show error message when API error occurs with status", () => {
      setup({
        lsValue: "query",
        all: { isError: true, error: { status: 500, data: "Server error" } },
      });
      render(<MovieApp />);
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });

    it("should show error message when error is instance of Error", () => {
      setup({
        lsValue: "error of loading",
        all: { isError: true, error: new Error("Custom error message") },
      });
      render(<MovieApp />);
      expect(screen.getByText("Custom error message")).toBeInTheDocument();
    });
  });

  describe("Rendering movies", () => {
    it("should render movies list when data is available", () => {
      const data = {
        results: [
          { id: 1, title: "Movie 1", overview: "Overview 1", posterUrl: "url1" },
          { id: 2, title: "Movie 2", overview: "Overview 2", posterUrl: null },
        ],
        total_pages: 3,
      };
      setup({ lsValue: "query", all: { data } });
      render(<MovieApp />);
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Refresh/i })).toBeInTheDocument();
    });

    it("should show 'No movies found' message when no results", () => {
      setup({ lsValue: "query", all: { data: { results: [], total_pages: 1 } } });
      render(<MovieApp />);
      expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call invalidateTags on refresh button click", () => {
      const invalidate = movieApi.util.invalidateTags;
      setup({
        lsValue: "query",
        all: {
          data: [
            {
              id: 1,
              title: "Movie 1",
              overview: "Overview 1",
              posterUrl: "url1",
            },
          ],
          total_pages: 1,
        },
      });
      render(<MovieApp />);
      fireEvent.click(screen.getByRole("button", { name: /Refresh/i }));
      expect(dispatchSpy).toHaveBeenCalledWith(invalidate(["Movies"]));
    });

    it("should not call refetch on empty search submit", () => {
      const refetchSpy = vi.fn();
      setup({ all: { refetch: refetchSpy }, popular: { refetch: refetchSpy } });
      render(<MovieApp />);
      expect(refetchSpy).not.toHaveBeenCalled();
    });

    it("should trigger refetch when search input is only spaces", () => {
      const setLsSpy = vi.fn();
      const setParamsSpy = vi.fn();
      const refetchSpy = vi.fn();

      setup({
        lsValue: "movie title",
        setLs: setLsSpy,
        params: [new URLSearchParams([["page", "1"]]), setParamsSpy],
        all: { refetch: refetchSpy },
        popular: { refetch: refetchSpy },
      });

      render(<MovieApp />);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "   " } });

      expect(setLsSpy).toHaveBeenCalledWith("   ");
      expect(setParamsSpy).toHaveBeenCalledWith({ page: "1" });
      expect(refetchSpy).toHaveBeenCalled();
    });
  });
});
