import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  type: 'edit',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    close: (state) => {
      state.opened = false;
    },
    open: (state, { payload }) => {
      state.opened = true;
      state.type = payload;
    },
  },
});

export const getOpened = (state) => state.modal.opened;
export const getType = (state) => state.modal.type;

export const {
  open,
  close,
} = modalSlice.actions;

export default modalSlice.reducer;
