import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  users: string[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUser: (state, actions) => {
      state.users = [actions.payload, ...state.users];
    },
  },
});

export const { addNewUser } = userSlice.actions;
export default userSlice.reducer;
