import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";

const SERVICES_URL = "/services";
// const BASE_URL = "https://sunnyekb.ru/api/v1";

type ParamsServices = {
  limit?: number;
  page: number;
  search?: string;
  typeId: string;
};

const servicesAdapter = createEntityAdapter({
  selectId: (item: any) => item.id,
});

const servicesSelector = servicesAdapter.getSelectors();

const getRequestConfig = (method: string, data?: object) => ({
  method,
  credentials: "include" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
  },
  body: data ? JSON.stringify(data) : undefined,
});

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Services", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  keepUnusedDataFor: 180, //3 минуты
  endpoints: (build) => ({
    getServices: build.query<EntityState<any, number>, ParamsServices>({
      query: ({ limit = 15, page = 1, search, typeId }) => ({
        url: `${SERVICES_URL}/?${limit ? `limit=${limit} ` : ""}&page=${page}${
          search ? `&title=${search}` : ""
        }&type_id=${typeId}`.replace(/\s+/g, ""), // regex удаляет все пробелы в строке
        method: "GET",
        credentials: "include",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }),
      merge: (currentState, incomingState) => {
        return servicesAdapter.addMany(
          currentState,
          servicesSelector.selectAll(incomingState)
        );
      },
      transformResponse: (response: any) => {
        return servicesAdapter.addMany(
          servicesAdapter.getInitialState(),
          response.results
        );
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search
        );
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return JSON.stringify({
          search: queryArgs.search,
        });
      },

      providesTags: (result, error, args) =>
        result
          ? [
              { type: "Services", id: JSON.stringify(args) },
              { type: "Services", id: "PARTIAL-LIST" },
            ]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"],
    }),
    createService: build.mutation({
      query: (data) => ({
        url: `${SERVICES_URL}/services/`,
        method: "POST",
        credentials: "include",
        data: JSON.stringify(data),
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }),
    }),
    addToFavorites: build.mutation({
      query: (id) => ({
        url: `/ads/${id}/add-to-favorites/`,
        ...getRequestConfig("POST"),
      }),
    }),
  }),
});

export const { useGetServicesQuery, useCreateServiceMutation, useAddToFavoritesMutation } = servicesApi;

export { servicesAdapter, servicesSelector };
