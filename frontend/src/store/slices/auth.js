import routes from '../../routes';
import baseApi from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: routes.login,
        method: 'post',
        data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: routes.signup,
        method: 'post',
        data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authApi;

export default authApi;
