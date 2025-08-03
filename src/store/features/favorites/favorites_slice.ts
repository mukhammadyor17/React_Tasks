import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoritePost {
  id: number;
  title: string;
  body: string;
}

export interface FavoritesState {
  favorites: FavoritePost[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoritePost>) => {
      const isExist = state.favorites.some(
        (post) => post.id === action.payload.id
      );
      if (isExist) {
        state.favorites = state.favorites.filter(
          (post) => post.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    clear: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clear } = favoritesSlice.actions;

export default favoritesSlice.reducer;
