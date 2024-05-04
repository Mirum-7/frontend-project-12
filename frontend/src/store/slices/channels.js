import baseApi, { createHeaders, getTokenFromStorage } from './baseApi';
import routes from '../../routes';

const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channels,
        method: 'GET',
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels,
        method: 'POST',
        body: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `${routes.channels}/${id}`,
        method: 'PATCH',
        body: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channels}/${id}`,
        method: 'DELETE',
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['messages'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelApi;
export default channelApi;
