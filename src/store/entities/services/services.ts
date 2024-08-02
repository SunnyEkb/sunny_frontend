import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVICES_URL = "/services";
const BASE_URL = "https://sunnyekb.ru/api/v1";

type ParamsServices = {
  limit?: number;
  page: number;
  search?: string;
};

const servicesAdapter = createEntityAdapter({
  selectId: (item: any) => item.id,
});

const servicesSelector = servicesAdapter.getSelectors();

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Services", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  keepUnusedDataFor: 180, //3 минуты

  endpoints: (build) => ({
    getServices: build.query<EntityState<any, number>, ParamsServices>({
      query: ({ limit = 15, page = 1, search }) => ({
        url: `${SERVICES_URL}?${limit ? `limit=${limit} ` : ""}&page=${page}${
          search ? `&search=${search}` : ""
        }`.replace(/\s+/g, ""), // regex удаляет все пробелы в строке
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
  }),
});

export const { useGetServicesQuery } = servicesApi;

export { servicesAdapter, servicesSelector };
