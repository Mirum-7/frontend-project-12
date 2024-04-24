import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.token = null;
      state.username = null;
      state.loggedIn = false;
    },
  },
});

export const getLoggedIn = (state) => state.auth.loggedIn;
export const getUsername = (state) => state.auth.username;
export const getToken = (state) => state.auth.loggedIn;

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
