import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";

import { BaseResponse } from "../ads/adsApi";

export type Notification = {
  id: number;
  text: string;
  link: string;
  created_at: string;
  updated_at: string;
  read_at: string;
}

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 100,
  endpoints: (build) => ({
    getNotifications: build.query<BaseResponse<Notification>, void>({
      query: () => ({
        url: `notifications/`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;
