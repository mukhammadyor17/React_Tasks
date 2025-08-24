import { createSlice } from '@reduxjs/toolkit';

interface Country {
  code: string;
  name: string;
}

export interface CountryState {
  countryList: Country[];
}

const initialState: CountryState = {
  countryList: [
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'RU', name: 'Russia' },
    { code: 'PL', name: 'Palestine' },
    { code: 'JP', name: 'Japan' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ],
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
