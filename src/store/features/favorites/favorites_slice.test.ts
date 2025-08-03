import { describe, it, expect } from 'vitest';
import { favoritesSlice, toggleFavorite, clear } from './favorites_slice';
import type { FavoritePost } from './favorites_slice';

describe('favoritesSlice', () => {
  const mockPost: FavoritePost = {
    id: 1,
    title: 'Test Post',
    body: 'Test body content',
  };

  const mockPost2: FavoritePost = {
    id: 2,
    title: 'Test Post 2',
    body: 'Test body content 2',
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      const initialState = favoritesSlice.getInitialState();
      expect(initialState).toEqual({
        favorites: [],
      });
    });
  });

  describe('toggleFavorite action', () => {
    it('should add a post to favorites when it does not exist', () => {
      const initialState = {
        favorites: [],
      };

      const newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(mockPost)
      );

      expect(newState.favorites).toHaveLength(1);
      expect(newState.favorites[0]).toEqual(mockPost);
    });

    it('should remove a post from favorites when it already exists', () => {
      const initialState = {
        favorites: [mockPost],
      };

      const newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(mockPost)
      );

      expect(newState.favorites).toHaveLength(0);
      expect(newState.favorites).toEqual([]);
    });

    it('should handle multiple posts correctly', () => {
      const initialState = {
        favorites: [mockPost],
      };

      // Add second post
      let newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(mockPost2)
      );

      expect(newState.favorites).toHaveLength(2);
      expect(newState.favorites).toContainEqual(mockPost);
      expect(newState.favorites).toContainEqual(mockPost2);

      // Remove first post
      newState = favoritesSlice.reducer(newState, toggleFavorite(mockPost));

      expect(newState.favorites).toHaveLength(1);
      expect(newState.favorites[0]).toEqual(mockPost2);
    });

    it('should not affect other posts when toggling one post', () => {
      const initialState = {
        favorites: [mockPost, mockPost2],
      };

      const newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(mockPost)
      );

      expect(newState.favorites).toHaveLength(1);
      expect(newState.favorites[0]).toEqual(mockPost2);
    });

    it('should handle posts with same id but different content', () => {
      const postWithSameId: FavoritePost = {
        id: 1,
        title: 'Different Title',
        body: 'Different body',
      };

      const initialState = {
        favorites: [mockPost],
      };

      const newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(postWithSameId)
      );

      expect(newState.favorites).toHaveLength(0);
    });
  });

  describe('clear action', () => {
    it('should clear all favorites', () => {
      const initialState = {
        favorites: [mockPost, mockPost2],
      };

      const newState = favoritesSlice.reducer(initialState, clear());

      expect(newState.favorites).toEqual([]);
      expect(newState.favorites).toHaveLength(0);
    });

    it('should handle clearing empty favorites', () => {
      const initialState = {
        favorites: [],
      };

      const newState = favoritesSlice.reducer(initialState, clear());

      expect(newState.favorites).toEqual([]);
      expect(newState.favorites).toHaveLength(0);
    });
  });

  describe('action creators', () => {
    it('should create toggleFavorite action with correct payload', () => {
      const action = toggleFavorite(mockPost);

      expect(action.type).toBe('favorites/toggleFavorite');
      expect(action.payload).toEqual(mockPost);
    });

    it('should create clear action with correct type', () => {
      const action = clear();

      expect(action.type).toBe('favorites/clear');
    });
  });

  describe('edge cases', () => {
    it('should maintain immutability pattern', () => {
      const initialState = {
        favorites: [mockPost],
      };

      const newState = favoritesSlice.reducer(
        initialState,
        toggleFavorite(mockPost2)
      );

      expect(initialState.favorites).toHaveLength(1);
      expect(newState.favorites).toHaveLength(2);
      expect(newState).not.toBe(initialState);
    });
  });
});
