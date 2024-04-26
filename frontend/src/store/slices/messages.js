import { io } from 'socket.io-client';
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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io();

        try {
          await cacheDataLoaded;

          const listener = (data) => {
            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          socket.on('newMessage', listener);
        } catch (e) {
          console.log(e);
        }

        await cacheEntryRemoved;
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages,
        method: 'post',
        data: message,
        headers: createHeaders(getTokenFromStorage()),
      }),
      // invalidatesTags: ['messages'],
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
