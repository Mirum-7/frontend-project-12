import { io } from 'socket.io-client';
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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io();

        try {
          await cacheDataLoaded;

          const addListener = (data) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          const removeListener = (data) => {
            updateCachedData((draft) => {
              const pos = draft.map((channel) => channel.id).indexOf(data.id);
              draft.splice(pos, 1);
            });
          };

          const renameListener = (data) => {
            updateCachedData((draft) => {
              const pos = draft.map((channel) => channel.id).indexOf(data.id);
              draft[pos] = data;
            });
          };

          socket.on('newChannel', addListener);
          socket.on('removeChannel', removeListener);
          socket.on('renameChannel', renameListener);
        } catch (e) {
          console.log(e);
        }

        await cacheEntryRemoved;
      },
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels,
        method: 'post',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: `${routes.channels}/${id}`,
        method: 'patch',
        data: channel,
        headers: createHeaders(getTokenFromStorage()),
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channels}/${id}`,
        method: 'delete',
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
