import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosAuthorizedBaseQuery } from "../../../utils/api/axiosQuery";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosAuthorizedBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<string, { username: string }>({
      query: (body) => ({
        url: "authorization/login",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
