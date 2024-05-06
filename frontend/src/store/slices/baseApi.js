import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId'))?.token;

const baseApi = createApi({
  reducerPath: 'base',
  tagTypes: ['messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${getTokenFromStorage()}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApi;
