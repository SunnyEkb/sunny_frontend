import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";
import { AdsInfo } from "../../../common/model/ads";

const SERVICES_URL = "/services";

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
  keepUnusedDataFor: 1, //1 секунда
  endpoints: (build) => ({
    getServices: build.query<EntityState<any, number>, ParamsServices>({
      query: ({ limit = 15, page = 1, search, typeId }) => ({
        url: `${SERVICES_URL}/?${limit ? `limit=${limit} ` : ""}&page=${page}${
          search ? `&title=${search}` : ""
        }&type_id=${typeId}`.replace(/\s+/g, ""), // regex удаляет все пробелы в строке
        method: "GET",
        credentials: "include",
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
        url: `/services/`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    publishService: build.mutation({
      query: (id: string) => ({
        url: `/services/${id}/publish/`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    addPhotoToService: build.mutation({
      query: (data: { id: string; images: { image: string }[] }) => ({
        url: `/services/${data.id}/add-photo/`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    update: build.mutation({
      query: (data: AdsInfo) => ({
        url: `/services/${data.id}/`,
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    addToFavorites: build.mutation({
      query: (id) => ({
        url: `/services/${id}/add-to-favorites/`,
        ...getRequestConfig("POST"),
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Services", id: "PARTIAL-LIST" },
        { type: "Services", id },
      ], // edited line
    }),
    addComment: build.mutation({
      query: (data: { id: string; feedback: string; rating: number }) => ({
        url: `/services/${data.id}/add-comment/`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    deleteFromFavorites: build.mutation({
      query: (id) => ({
        url: `/services/${id}/delete-from-favorites/`,
        ...getRequestConfig("DELETE"),
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Services", id: "PARTIAL-LIST" },
        { type: "Services", id },
      ], // edited line
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  usePublishServiceMutation,
  useAddToFavoritesMutation,
  useAddPhotoToServiceMutation,
  useUpdateMutation,
  useDeleteFromFavoritesMutation,
  useAddCommentMutation,
} = servicesApi;

export { servicesAdapter, servicesSelector };
