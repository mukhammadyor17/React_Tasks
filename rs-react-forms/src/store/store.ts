import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/country/countrySlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
