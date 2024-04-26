import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: '1',
  default: '1',
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    select: (state, { payload }) => {
      state.channelId = payload.id;
    },
  },
});

export const getSelectedId = (state) => state.selected.channelId;
export const getDefaultSelectedId = (state) => state.selected.default;

export const { select, setLastSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
