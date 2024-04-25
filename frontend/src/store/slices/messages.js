import baseApi from './baseApi';
import { createHeaders } from './axiosBaseQuery';
import routes from '../../routes';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId'))?.token;

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.messages,
        method: 'get',
        headers: createHeaders(getTokenFromStorage()),
      }),
      providesTags: ['messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages,
        method: 'post',
        data: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
    editMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `${routes.messages}/${id}`,
        method: 'patch',
        data: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `${routes.messages}/${id}`,
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
