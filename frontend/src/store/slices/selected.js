import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  name: '',
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    select: (state, { payload }) => {
      state.channelId = payload.id;
      state.name = payload.name;
    },
  },
});

export const getSelectedId = (state) => state.selected.channelId;
export const getSelectedName = (state) => state.selected.name;

export const { select } = selectedSlice.actions;

export default selectedSlice.reducer;
