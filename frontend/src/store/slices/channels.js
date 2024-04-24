import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';
import axiosBaseQuery, { createHeaders } from './axiosBaseQuery';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId')).token;

const channelApi = createApi({
  reducerPath: 'channels',
  baseQuery: axiosBaseQuery({
    baseUrl: routes.channels,
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: '',
        method: 'get',
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'post',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `/${id}`,
        method: 'patch',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'delete',
        headers: createHeaders(getTokenFromStorage()),
      }),
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
