import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';
import axiosBaseQuery, { createHeaders } from './axiosBaseQuery';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId')).token;

const messageApi = createApi({
  reducerPath: 'messages',
  tagTypes: ['messages'],
  baseQuery: axiosBaseQuery({
    baseUrl: routes.messages,
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: '',
        method: 'get',
        headers: createHeaders(getTokenFromStorage()),
      }),
      providesTags: ['messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '',
        method: 'post',
        data: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
    editMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `/${id}`,
        method: 'patch',
        data: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'delete',
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messageApi;
export default messageApi;
