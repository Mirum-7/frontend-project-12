import routes from '../../routes';
import baseApi from './baseApi';

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: routes.messages,
        method: 'GET',
      }),
      providesTags: ['messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages,
        method: 'POST',
        body: message,
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
