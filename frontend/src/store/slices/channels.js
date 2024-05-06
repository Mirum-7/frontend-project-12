import baseApi from './baseApi';
import routes from '../../routes';

const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channels,
        method: 'GET',
      }),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels,
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `${routes.channels}/${id}`,
        method: 'PATCH',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channels}/${id}`,
        method: 'DELETE',
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
