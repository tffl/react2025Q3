import { useDispatch, useSelector } from "react-redux";

import { clearSelection } from "../../store/selectedMoviesSlice";
import type { RootState } from "../../store/store";
import "./SelectedMoviesFlyout.css";

type Movie = {
  title: string;
  overview: string;
  posterUrl: string | null;
};

function generateCSV(movies: Movie[]): void {
  const formatCSV = (text: string) => `"${text.replace(/"/g, '""')}"`;
  const headers = ["title", "overview", "posterUrl"].join(",");
  const rows = movies.map(({ title, overview, posterUrl }) =>
    [formatCSV(title), formatCSV(overview), formatCSV(posterUrl || "")].join(",")
  );
  const csvContent = [headers, ...rows].join("\n");

  const csvData = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const csvUrl = URL.createObjectURL(csvData);
  Object.assign(document.createElement("a"), {
    href: csvUrl,
    download: `${movies.length}_items.csv`
  }).click();

  URL.revokeObjectURL(csvUrl);
}

export function SelectedMoviesFlyout() {
  const dispatch = useDispatch();
  const selectedMovies = useSelector((state: RootState) => state.selectedMovies.movies);

  return selectedMovies.length > 0 && (
    <div className="movie-flyout">
      <p>{selectedMovies.length === 1 ? "1 item" : `${selectedMovies.length} items`} selected</p>
      <button onClick={() => dispatch(clearSelection())}>Unselect all</button>
      <button onClick={() => generateCSV(selectedMovies)}>Download .csv</button>
    </div>
  );
}

export default SelectedMoviesFlyout;