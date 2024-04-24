import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

const baseApi = createApi({
  reducerPath: 'base',
  tagTypes: ['channels', 'messages'],
  baseQuery: axiosBaseQuery({
    baseUrl: '/',
  }),
  endpoints: () => ({}),
});

export default baseApi;
