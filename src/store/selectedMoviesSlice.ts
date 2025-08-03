import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Movie = {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  detailsUrl?: string;
};

const movieCardState = {
  movies: [] as Movie[],
};

type SelectedMoviesState = typeof movieCardState;

export const isMovieSelected = (state: SelectedMoviesState, id: number): boolean => {
  return state.movies.some(movie => movie.id === id);
};

const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState: movieCardState,
  reducers: {
    movieSelectionToggle(state, action: PayloadAction<Movie>) {
      const { id } = action.payload;

      if (isMovieSelected(state, id)) {
        state.movies = state.movies.filter(movie => movie.id !== id);
      } else {
        state.movies.push(action.payload);
      }
    },
    clearSelection(state) {
      state.movies = [];
    },
  },
});

export const { movieSelectionToggle, clearSelection } = selectedMoviesSlice.actions;
export default selectedMoviesSlice.reducer;