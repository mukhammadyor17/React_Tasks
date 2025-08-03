import { describe, it, expect } from 'vitest';
import { store } from './index';
import { toggleFavorite, clear } from './features/favorites/favorites_slice';
import type { FavoritePost } from './features/favorites/favorites_slice';

describe('Redux Store', () => {
  const mockPost: FavoritePost = {
    id: 1,
    title: 'Test Post',
    body: 'Test body content',
  };

  describe('store configuration', () => {
    it('should have the correct initial state', () => {
      const state = store.getState();

      expect(state).toHaveProperty('favorites');
      expect(state.favorites).toEqual({
        favorites: [],
      });
    });

    it('should have the correct state shape', () => {
      const state = store.getState();

      expect(state).toMatchObject({
        favorites: {
          favorites: expect.any(Array),
        },
      });
    });
  });

  describe('store dispatch', () => {
    it('should dispatch toggleFavorite action and update state', () => {
      let state = store.getState();
      expect(state.favorites.favorites).toHaveLength(0);

      store.dispatch(toggleFavorite(mockPost));

      state = store.getState();
      expect(state.favorites.favorites).toHaveLength(1);
      expect(state.favorites.favorites[0]).toEqual(mockPost);
    });

    it('should dispatch clear action and reset favorites', () => {
      store.dispatch(clear());
      store.dispatch(toggleFavorite(mockPost));
      let state = store.getState();
      expect(state.favorites.favorites).toHaveLength(1);

      store.dispatch(clear());

      state = store.getState();
      expect(state.favorites.favorites).toHaveLength(0);
      expect(state.favorites.favorites).toEqual([]);
    });

    it('should handle multiple actions in sequence', () => {
      const mockPost2: FavoritePost = {
        id: 2,
        title: 'Test Post 2',
        body: 'Test body content 2',
      };

      store.dispatch(toggleFavorite(mockPost));
      let state = store.getState();
      expect(state.favorites.favorites).toHaveLength(1);

      store.dispatch(toggleFavorite(mockPost2));
      state = store.getState();
      expect(state.favorites.favorites).toHaveLength(2);

      store.dispatch(toggleFavorite(mockPost));
      state = store.getState();
      expect(state.favorites.favorites).toHaveLength(1);
      expect(state.favorites.favorites[0]).toEqual(mockPost2);

      store.dispatch(clear());
      state = store.getState();
      expect(state.favorites.favorites).toHaveLength(0);
    });
  });

  describe('store state immutability', () => {
    it('should not mutate the original state', () => {
      const initialState = store.getState();
      const initialFavorites = [...initialState.favorites.favorites];

      store.dispatch(toggleFavorite(mockPost));

      expect(initialState.favorites.favorites).toEqual(initialFavorites);
      expect(store.getState().favorites.favorites).not.toEqual(
        initialFavorites
      );
    });
  });
});
