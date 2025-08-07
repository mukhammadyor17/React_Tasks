import { configureStore } from '@reduxjs/toolkit';
import { postApi } from './query/post_api';
import favoritesReducer from './features/favorites/favorites_slice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
