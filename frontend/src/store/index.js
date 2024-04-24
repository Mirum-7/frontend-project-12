import { configureStore } from '@reduxjs/toolkit';
import channelsApi from './slices/channels';
import authReducers from './slices/auth';
import selectedReducers from './slices/selected';
import modalReducers from './slices/modal';

const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    auth: authReducers,
    selected: selectedReducers,
    modal: modalReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});

export default store;
