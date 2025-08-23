import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  name: string;
}

const initialState: ModalState = {
  name: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    getModalName: (state, actions) => {
      state.name = actions.payload;
    },
  },
});

export const { getModalName } = modalSlice.actions;
export default modalSlice.reducer;
