import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sendingMessages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, { payload: message }) => {
      state.sendingMessages.push(message);
    },
    removeMessage: (state, { payload: id }) => {
      state.sendingMessages = state.sendingMessages.filter((message) => message.id !== id);
    },
  },
});

export const getSendingMessages = (state) => state.chat.sendingMessages;

export const { addMessage, removeMessage } = chatSlice.actions;

export default chatSlice.reducer;
