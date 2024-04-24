import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../../routes';
import axiosBaseQuery, { createHeaders } from './axiosBaseQuery';

const getTokenFromStorage = () => JSON.parse(localStorage.getItem('userId')).token;

const channelApi = createApi({
  reducerPath: 'channels',
  tagTypes: ['channels', 'messages'],
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
      providesTags: ['channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'post',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['channels'],
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `/${id}`,
        method: 'patch',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
      invalidatesTags: ['channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
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
