import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async thunk for demonstration
export const fetchFavoritesAsync = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}/favorites`);
    return response.json();
  }
);

export const addFavoriteAsync = createAsyncThunk(
  'favorites/addFavorite',
  async (post: { id: number; title: string; body: string }) => {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return response.json();
  }
);

// Example slice with async thunks
export interface AsyncFavoritesState {
  favorites: Array<{ id: number; title: string; body: string }>;
  loading: boolean;
  error: string | null;
}

const asyncInitialState: AsyncFavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const asyncFavoritesSlice = createSlice({
  name: 'asyncFavorites',
  initialState: asyncInitialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchFavoritesAsync
      .addCase(fetchFavoritesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      // addFavoriteAsync
      .addCase(addFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add favorite';
      });
  },
});

export const { clearError } = asyncFavoritesSlice.actions;

// Tests for async thunks
describe('Async Redux Toolkit Slice Testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchFavoritesAsync', () => {
    it('should handle pending state', () => {
      const initialState = {
        favorites: [],
        loading: false,
        error: 'Previous error',
      };

      const newState = asyncFavoritesSlice.reducer(
        initialState,
        fetchFavoritesAsync.pending('', 'user123')
      );

      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });

    it('should handle fulfilled state', () => {
      const mockFavorites = [
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
      ];

      const initialState = {
        favorites: [],
        loading: true,
        error: null,
      };

      const newState = asyncFavoritesSlice.reducer(
        initialState,
        fetchFavoritesAsync.fulfilled(mockFavorites, '', 'user123')
      );

      expect(newState.loading).toBe(false);
      expect(newState.favorites).toEqual(mockFavorites);
      expect(newState.error).toBe(null);
    });

    it('should handle rejected state', () => {
      const initialState = {
        favorites: [],
        loading: true,
        error: null,
      };

      const error = new Error('Network error');
      const newState = asyncFavoritesSlice.reducer(
        initialState,
        fetchFavoritesAsync.rejected(error, '', 'user123')
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Network error');
    });
  });

  describe('addFavoriteAsync', () => {
    it('should handle pending state', () => {
      const initialState = {
        favorites: [{ id: 1, title: 'Existing Post', body: 'Body' }],
        loading: false,
        error: 'Previous error',
      };

      const newState = asyncFavoritesSlice.reducer(
        initialState,
        addFavoriteAsync.pending('', {
          id: 2,
          title: 'New Post',
          body: 'New Body',
        })
      );

      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
      expect(newState.favorites).toHaveLength(1); // Should not change during pending
    });

    it('should handle fulfilled state', () => {
      const newPost = { id: 2, title: 'New Post', body: 'New Body' };
      const initialState = {
        favorites: [{ id: 1, title: 'Existing Post', body: 'Body' }],
        loading: true,
        error: null,
      };

      const newState = asyncFavoritesSlice.reducer(
        initialState,
        addFavoriteAsync.fulfilled(newPost, '', newPost)
      );

      expect(newState.loading).toBe(false);
      expect(newState.favorites).toHaveLength(2);
      expect(newState.favorites).toContainEqual(newPost);
    });

    it('should handle rejected state', () => {
      const initialState = {
        favorites: [{ id: 1, title: 'Existing Post', body: 'Body' }],
        loading: true,
        error: null,
      };

      const error = new Error('Failed to add favorite');
      const newState = asyncFavoritesSlice.reducer(
        initialState,
        addFavoriteAsync.rejected(error, '', {
          id: 2,
          title: 'New Post',
          body: 'New Body',
        })
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Failed to add favorite');
      expect(newState.favorites).toHaveLength(1); // Should not change on error
    });
  });

  describe('clearError action', () => {
    it('should clear the error state', () => {
      const initialState = {
        favorites: [],
        loading: false,
        error: 'Some error message',
      };

      const newState = asyncFavoritesSlice.reducer(initialState, clearError());

      expect(newState.error).toBe(null);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple async operations', () => {
      let state = asyncFavoritesSlice.getInitialState();

      // Start fetching
      state = asyncFavoritesSlice.reducer(
        state,
        fetchFavoritesAsync.pending('', 'user123')
      );
      expect(state.loading).toBe(true);

      // Start adding while fetching
      state = asyncFavoritesSlice.reducer(
        state,
        addFavoriteAsync.pending('', { id: 1, title: 'Post', body: 'Body' })
      );
      expect(state.loading).toBe(true);

      // Complete fetching
      const mockFavorites = [{ id: 1, title: 'Post', body: 'Body' }];
      state = asyncFavoritesSlice.reducer(
        state,
        fetchFavoritesAsync.fulfilled(mockFavorites, '', 'user123')
      );
      expect(state.loading).toBe(false);
      expect(state.favorites).toEqual(mockFavorites);

      // Complete adding
      const newPost = { id: 2, title: 'New Post', body: 'New Body' };
      state = asyncFavoritesSlice.reducer(
        state,
        addFavoriteAsync.fulfilled(newPost, '', newPost)
      );
      expect(state.favorites).toHaveLength(2);
    });
  });
});
