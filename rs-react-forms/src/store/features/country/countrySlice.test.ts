import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import '@testing-library/jest-dom/vitest';

const createTestStore = () => {
  return configureStore({
    reducer: {
      country: countryReducer,
    },
  });
};

describe('countrySlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  describe('initial state', () => {
    it('should have the correct initial state', () => {
      const state = store.getState().country;

      expect(state).toEqual({
        countryList: [
          { code: 'KZ', name: 'Kazakhstan' },
          { code: 'RU', name: 'Russia' },
          { code: 'PL', name: 'Palestine' },
          { code: 'JP', name: 'Japan' },
          { code: 'DE', name: 'Germany' },
          { code: 'FR', name: 'France' },
        ],
      });
    });

    it('should have 6 countries in the initial list', () => {
      const state = store.getState().country;
      expect(state.countryList).toHaveLength(6);
    });

    it('should have countries with correct structure', () => {
      const state = store.getState().country;
      state.countryList.forEach((country) => {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
      });
    });
  });

  describe('reducer', () => {
    it('should return the same state for unknown actions', () => {
      const initialState = store.getState().country;

      store.dispatch({ type: 'unknown/action' });

      const newState = store.getState().country;
      expect(newState).toEqual(initialState);
    });

    it('should maintain immutability', () => {
      const initialState = store.getState().country;
      const initialCountryList = [...initialState.countryList];

      store.dispatch({ type: 'unknown/action' });

      const newState = store.getState().country;
      expect(newState.countryList).not.toBe(initialCountryList);
      expect(newState.countryList).toEqual(initialCountryList);
    });
  });

  describe('selectors', () => {
    it('should select country list from state', () => {
      const state = store.getState();
      const countryList = state.country.countryList;

      expect(countryList).toEqual([
        { code: 'KZ', name: 'Kazakhstan' },
        { code: 'RU', name: 'Russia' },
        { code: 'PL', name: 'Palestine' },
        { code: 'JP', name: 'Japan' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
      ]);
    });

    it('should select specific country by code', () => {
      const state = store.getState();
      const kazakhstan = state.country.countryList.find((c) => c.code === 'KZ');

      expect(kazakhstan).toEqual({ code: 'KZ', name: 'Kazakhstan' });
    });

    it('should return undefined for non-existent country code', () => {
      const state = store.getState();
      const nonExistent = state.country.countryList.find(
        (c) => c.code === 'XX'
      );

      expect(nonExistent).toBeUndefined();
    });
  });

  describe('store integration', () => {
    it('should maintain state consistency across multiple dispatches', () => {
      const initialState = store.getState().country;

      store.dispatch({ type: 'test/action1' });
      store.dispatch({ type: 'test/action2' });
      store.dispatch({ type: 'test/action3' });

      const finalState = store.getState().country;
      expect(finalState).toEqual(initialState);
    });

    it('should handle rapid successive dispatches', () => {
      const initialState = store.getState().country;

      for (let i = 0; i < 10; i++) {
        store.dispatch({ type: `test/action${i}` });
      }

      const finalState = store.getState().country;
      expect(finalState).toEqual(initialState);
    });
  });

  describe('country data validation', () => {
    it('should have unique country codes', () => {
      const state = store.getState().country;
      const codes = state.countryList.map((c) => c.code);
      const uniqueCodes = new Set(codes);

      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('should have valid country codes (2 characters)', () => {
      const state = store.getState().country;
      state.countryList.forEach((country) => {
        expect(country.code.length).toBe(2);
      });
    });
  });

  describe('performance and memory', () => {
    it('should not create new objects for unchanged state', () => {
      const initialState = store.getState().country;
      const initialCountryList = initialState.countryList;

      store.dispatch({ type: 'unknown/action' });

      const newState = store.getState().country;
      expect(newState.countryList).toBe(initialCountryList);
    });
  });
});
