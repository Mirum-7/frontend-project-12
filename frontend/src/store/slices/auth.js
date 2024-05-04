import routes from '../../routes';
import baseApi from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: routes.login,
        method: 'post',
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: routes.signup,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authApi;

export default authApi;
