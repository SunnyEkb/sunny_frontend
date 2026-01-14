import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";
import { ServiceInfo } from "../../../common/model/ads";

const SERVICES_URL = "/advertisements";

type ParamsServices = {
  limit?: number;
  page: number;
  search?: string;
  catalogId: string;
};

const servicesAdapter = createEntityAdapter({
  selectId: (item: any) => item.id,
});

interface ServicesState extends EntityState<any, number> {
  next: string | null;
  previous: string | null;
  count: number;
}

const initialState: ServicesState = servicesAdapter.getInitialState({
  next: null,
  previous: null,
  count: 0,
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
  tagTypes: ["Services", "UNAUTHORIZED", "UNKNOWN_ERROR", "Favorite"],
  keepUnusedDataFor: 0, //0 секунда
  endpoints: (build) => ({
    getServices: build.query<ServicesState, ParamsServices>({
      query: ({ limit = 15, page = 1, search, catalogId }) => ({
        url: `${SERVICES_URL}/?${limit ? `limit=${limit} ` : ""}&page=${page}${
          search ? `&title=${search}` : ""
        }&catalog_id=${catalogId}`.replace(/\s+/g, ""), // regex удаляет все пробелы в строке
        method: "GET",
        credentials: "include",
      }),
      merge: (currentState, incomingState) => {
        const merged = servicesAdapter.upsertMany(
          currentState,
          servicesSelector.selectAll(incomingState)
        );

        merged.next = incomingState.next;
        merged.previous = incomingState.previous;
        merged.count = incomingState.count;

        return merged;
      },
      transformResponse: (response: any): ServicesState => {
        return servicesAdapter.addMany(
          {
            ...initialState,
            next: response.next,
            previous: response.previous,
            count: response.count,
          },
          // фильтруем, чтоб были только услуги
          response.results.filter(
            (item: { type: "ad" | "serivce" }) => item.type !== "ad"
          )
        );
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search
        );
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        if (queryArgs.search?.length)
          return JSON.stringify({
            search: queryArgs.search,
          });

        return endpointName;
      },
      providesTags: (result, error, args) =>
        result
          ? [{ type: "Services", id: "PARTIAL-LIST" }]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"],
    }),
    getUserAdvertisements: build.query<
      Pick<ServicesState, "count" | "next" | "previous"> & {
        results: ServiceInfo[];
      },
      void
    >({
      query: () => ({
        url: "/my-advertisements/",
        method: "GET",
        credentials: "include",
      }),
    }),
    createService: build.mutation({
      query: ({ endPoint, data }) => ({
        url: `/${endPoint}/`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Services", id: "PARTIAL-LIST" }],
    }),
    getFavorites: build.query<
      Pick<ServicesState, "count" | "next" | "previous"> & {
        results: { subject: ServiceInfo }[];
      },
      void
    >({
      query: () => ({
        url: `/favorite/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Favorite"],
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
      query: (data: ServiceInfo) => ({
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
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          servicesApi.util.updateQueryData(
            "getServices",
            {} as ParamsServices,
            (draft) => {
              servicesAdapter.updateOne(draft, {
                id: id,
                changes: { is_favorited: true },
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Favorite"],
    }),
    deleteFromFavorites: build.mutation({
      query: (id) => ({
        url: `/services/${id}/delete-from-favorites/`,
        ...getRequestConfig("DELETE"),
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          servicesApi.util.updateQueryData(
            "getServices",
            {} as ParamsServices,
            (draft) => {
              servicesAdapter.updateOne(draft, {
                id: id,
                changes: { is_favorited: false },
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Favorite"],
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
  useGetFavoritesQuery,
  useGetUserAdvertisementsQuery
} = servicesApi;

export { servicesAdapter, servicesSelector };
