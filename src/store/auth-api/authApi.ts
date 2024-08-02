/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constans";

/* export const BASE_URL: string = 'https://sunnyekb.ru/api/v1/';

export const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : ''; */

export const getToken = (): string => {
  const localStorageToken = localStorage.getItem('token');
  const sessionStorageToken = sessionStorage.getItem('token');
  return localStorageToken || sessionStorageToken || '';
};

export const preHeaders = () => {
  const tokenA = getToken();
 /*  const tokenObject = getToken();
  const tokenA = tokenObject.token; */
  return tokenA
    ? {
      "Content-Type": "application/json",
      Authorization: `Token ${tokenA}`,
    }
    : {
      "Content-Type": "application/json",
    };
};

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
        headers: preHeaders(),
        body: JSON.stringify(data),
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: `logout/`,
        method: 'POST',
        headers: preHeaders(),
      }),
    }),
    register: build.mutation<string, any>({
      query: (data) => ({
        url: `registry/`,
        method: 'POST',
        headers: preHeaders(),
        body: JSON.stringify(data),
      }),
    }),
    checkAuth: build.query<any, void>({
      query: () => ({
        url: `users/me/`,
        method: 'GET',
        headers: preHeaders(),
      }),
    }),
  }),
});

export const {
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthQuery
} = authApi;

export type AuthApi = typeof authApi;
//export type AuthApiEndpoints = ReturnType<AuthApi['endpoints']>;


