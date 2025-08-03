import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Movie = {
    id: string;
    name: string;
    description: string;
    detailsUrl: string;
};

const movieCardState = {
    selectedMovies: [] as Movie[],
};

type SelectedMoviesState = typeof movieCardState;

export const isMovieSelected = (state: SelectedMoviesState, id: string): boolean => {
    return state.selectedMovies.some(movie => movie.id === id);
};

const selectedMoviesSlice = createSlice({
    name: 'selectedMovies',
    initialState: movieCardState,
    reducers: {
        movieSelectionToggle(state, action: PayloadAction<Movie>) {
            const { id } = action.payload;

            if (isMovieSelected(state, id)) {
                state.selectedMovies = state.selectedMovies.filter(movie => movie.id !== id);
            } else {
                state.selectedMovies.push(action.payload);
            }
        },
        clearSelection(state) {
            state.selectedMovies = [];
        },
    },
});

export const { movieSelectionToggle, clearSelection } = selectedMoviesSlice.actions;
export default selectedMoviesSlice.reducer;