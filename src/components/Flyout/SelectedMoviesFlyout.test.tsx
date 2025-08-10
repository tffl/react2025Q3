import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { clearSelection } from "../../store/selectedMoviesSlice";

import SelectedMoviesFlyout from "./SelectedMoviesFlyout";

vi.mock("react-redux", () => {
  return {
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

type Movie = {
  title: string;
  overview: string;
  posterUrl: string | null;
};

describe("SelectedMoviesFlyout", () => {
  const selectedMoviesMock: Movie[] = [
    { title: "Movie 1", overview: "Desc 1", posterUrl: "url1" },
    { title: "Movie 2", overview: "Desc 2", posterUrl: "url2" },
  ];

  let useSelectorMock: ReturnType<typeof vi.fn>;
  let useDispatchMock: ReturnType<typeof vi.fn>;
  let mockDispatch: ReturnType<typeof vi.fn>;

  function renderWithMocks(movies: Movie[] | []) {
    useSelectorMock.mockReturnValue(movies);
    useDispatchMock.mockReturnValue(mockDispatch);
    render(<SelectedMoviesFlyout />);
  }

  beforeEach(() => {
    useSelectorMock = reactRedux.useSelector as unknown as ReturnType<
      typeof vi.fn
    >;
    useDispatchMock = reactRedux.useDispatch as unknown as ReturnType<
      typeof vi.fn
    >;
    mockDispatch = vi.fn();

    vi.clearAllMocks();
  });

  it("render correctly with selected movies and show correct count", () => {
    renderWithMocks(selectedMoviesMock);

    expect(screen.getByText("2 items selected")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Unselect all/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Download/i })).toBeTruthy();
  });

  it("call clearSelection on 'Unselect all' button click", async () => {
    const user = userEvent.setup();

    renderWithMocks(selectedMoviesMock);

    await user.click(screen.getByRole("button", { name: /Unselect all/i }));

    expect(mockDispatch).toHaveBeenCalledWith(clearSelection());
  });

  it("call generateCSV on 'Download' button click", async () => {
    const user = userEvent.setup();

    const createObjectURLMock = vi.fn(() => "blob:url");
    const revokeObjectURLMock = vi.fn();

    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    const link = document.createElement("a");
    link.click = vi.fn();

    const originalCreateElement = document.createElement.bind(document);

    vi.spyOn(document, "createElement").mockImplementation(
      (tagName: string) => {
        if (tagName === "a") return link;
        return originalCreateElement(tagName);
      },
    );

    renderWithMocks(selectedMoviesMock);

    await user.click(screen.getByRole("button", { name: /Download/i }));

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(link.click).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });
});
