import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId'))?.token;

const baseApi = createApi({
  reducerPath: 'base',
  tagTypes: ['messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: () => ({}),
});

export default baseApi;
