/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constans";

//export const BASE_URL: string = 'https://sunnyekb.ru/api/v1/';



export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    login: build.query<string, any>({
      query: (data) => ({
        url: `login/`,
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: `logout/`,
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: build.mutation<string, any>({
      query: (data) => ({
        url: `registry/`,
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    checkAuth: build.query<any, void>({
      query: () => ({
        url: `users/me/`,
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateUserProfile: build.mutation<any, any>({
      query: (data) => ({
        url: `users/me/`,
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useUpdateUserProfileMutation
} = authApi;

export type AuthApi = typeof authApi;
//export type AuthApiEndpoints = ReturnType<AuthApi['endpoints']>;


