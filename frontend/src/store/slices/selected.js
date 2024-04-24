import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    select: (state, { payload }) => {
      state.channelId = payload;
    },
  },
});

export const getSelectedId = (state) => state.selected.channelId;

export const { select } = selectedSlice.actions;

export default selectedSlice.reducer;
