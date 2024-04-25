import baseApi from './baseApi';
import { createHeaders } from './axiosBaseQuery';
import routes from '../../routes';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId'))?.token;

const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: routes.channels,
        method: 'get',
        headers: createHeaders(getTokenFromStorage()),
      }),
      providesTags: ['channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels,
        method: 'post',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['channels'],
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `${routes.channels}/${id}`,
        method: 'patch',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channels}/${id}`,
        method: 'delete',
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['channels', 'messages'],
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
