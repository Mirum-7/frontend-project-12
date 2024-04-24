import { configureStore } from '@reduxjs/toolkit';
import channelsApi from './slices/channels';
import authReducers from './slices/auth';
import selectedReducers from './slices/selected';
import modalReducers from './slices/modal';
import messageApi from './slices/messages';

const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    auth: authReducers,
    selected: selectedReducers,
    modal: modalReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messageApi.middleware),
});

export default store;
