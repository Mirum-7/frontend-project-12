import { configureStore } from '@reduxjs/toolkit';
import selectedReducers from './slices/selected';
import modalReducers from './slices/modal';
import baseApi from './slices/baseApi';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    selected: selectedReducers,
    modal: modalReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(baseApi.middleware),
});

export default store;
