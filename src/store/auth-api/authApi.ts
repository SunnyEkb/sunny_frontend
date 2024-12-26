/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constans";
import { User } from "../slices/authSlice";

//export const BASE_URL: string = 'https://sunnyekb.ru/api/v1/';

const getRequestConfig = (method: string, data?: any) => ({
  method,
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
  body: data ? JSON.stringify(data) : undefined,
});

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    login: build.query<string, { email?: string; password?: string }>({
      query: (data) => ({
        url: "login/",
        ...getRequestConfig("POST", data),
      }),
    }),
    token: build.query<string, void>({
      query: () => ({
        url: "auth/token/",
        ...getRequestConfig("POST"),
      }),
    }),
    refrechToken: build.query<string, void>({
      query: () => ({
        url: "token-refresh/",
        ...getRequestConfig("POST"),
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: "logout/",
        ...getRequestConfig("POST"),
      }),
    }),
    register: build.mutation<string, { email?: string; password?: string }>({
      query: (data) => ({
        url: "registry/",
        ...getRequestConfig("POST", data),
      }),
    }),
    checkAuth: build.query<any, void>({
      query: () => ({
        url: "users/me/",
        ...getRequestConfig("GET"),
      }),
    }),
    //updateUserProfile: build.mutation<any, {id: number,  username?: string; first_name?: string | null, last_name?: string | null, email?: string; phone?: string,  password?: string, avatar?: File }>({
    updateUserProfile: build.mutation<any, Partial<User> & { id?: number }>({
      query: ({ id, ...data }) => ({
        url: `users/${id}/`,
        ...getRequestConfig("PATCH", data),
      }),
    }),
    updateUserAvatar: build.mutation<any, any>({
      query: ({ avatar, id }) => {
        return {
          url: `users/avatar/${id}/`,
          method: "PATCH",
          credentials: "include" as RequestCredentials,
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ avatar: avatar }),

          body: JSON.stringify({ avatar: avatar }),
        };
      },
    }),
    passwordRecovery: build.mutation<string, { email?: string }>({
      query: (data) => ({
        url: "password_reset/",
        ...getRequestConfig("POST", data),
      }),
    }),
    passwordForget: build.mutation<string, { password?: string, token?: string }>({
      query: (data) => ({
        url: "password_reset/confirm/",
        ...getRequestConfig("POST", data),
      }),
    }),
    verifyRegistration: build.mutation<string, { token?: string }>({
      query: (data) => ({
        url: "verify-registration/",
        ...getRequestConfig("POST", data),
      }),
    }),
  }),
});



export const {
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterMutation,
  useLogoutMutation,
  useLazyCheckAuthQuery,
  useUpdateUserProfileMutation,
  useLazyTokenQuery,
  useLazyRefrechTokenQuery,
  usePasswordRecoveryMutation,
  useUpdateUserAvatarMutation,
  usePasswordForgetMutation,
  useVerifyRegistrationMutation,
} = authApi;

export type AuthApi = typeof authApi;
//export type AuthApiEndpoints = ReturnType<AuthApi['endpoints']>;
