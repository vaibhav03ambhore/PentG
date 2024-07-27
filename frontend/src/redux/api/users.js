import { apiSlice } from './apiSlice';
import { USER_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: 'POST',
      }),
    }),

    profile: builder.mutation({
      query:(data)=>({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body:data,
      })
    }),

    getOthersProfile:builder.query({
      query:(id)=>({
        url: `${USER_URL}/${id}/profile`,
        method: 'GET',
      })
    }),
    getCurrentUserProfile:builder.query({
      query:()=>({
        url:`${USER_URL}/profile`,
        method:'GET',
      })
    }),
    getUsernameById:builder.query({
      query:(id)=>({
        url: `${USER_URL}/${id}/username`,
        method: 'GET',
      })
    }),
    getCurrentUserProfile:builder.query({
      query:()=>({
        url: `${USER_URL}/profile`,
        method: 'GET',
      })
    }),

     
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation, 
  useLogoutMutation,
  useProfileMutation,
  useGetOthersProfileQuery,
  useGetCurrentUserProfileQuery,
  useGetUsernameByIdQuery,
} = userApiSlice;
