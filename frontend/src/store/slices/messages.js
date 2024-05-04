import baseApi, { createHeaders, getTokenFromStorage } from './baseApi';
import routes from '../../routes';

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.messages,
        method: 'GET',
        headers: createHeaders(getTokenFromStorage()),
      }),
      providesTags: ['messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages,
        method: 'POST',
        body: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
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
