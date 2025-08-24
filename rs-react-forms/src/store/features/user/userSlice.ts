import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  gender: string;
  file: string;
  accept: boolean;
  timestamp: number;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUser: (state, actions) => {
      const newUser = {
        ...actions.payload,
        timestamp: Date.now(),
      };
      state.users = [newUser, ...state.users];
    },
  },
});

export const { addNewUser } = userSlice.actions;
export default userSlice.reducer;
