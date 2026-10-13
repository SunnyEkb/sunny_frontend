import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";
import { ServiceInfo } from "../../../common/model/ads";

export interface ISearchItem {
  id: number;
  type: "ad" | "service";
  address: string | null;
  title: string;
  description: string;
  price?: string; // в услугах почему-то цены никакой нет
  place_of_provision?: string; // поле есть в услугах
  condition?: string; // поле есть в объявленияхы
  salon_name?: string; // поле есть в услугах
  is_favorited: boolean;
  img?: string;
  title_photo?: {
    id: number;
    image: string;
    title_photo: boolean;
  };
}
type SearchParams = {
  searchString: string;
  category?: string;
};

type AdvertSearchParams = {
  searchString: string;
  category_id: string;
  limit: number;
  page: number;
};

type AdvertSearchResponse = {
  results: ServiceInfo[];
  next: string | null;
  previous: string | null;
  count: number;
};

type TransformedAdvertResponse = {
  items: ServiceInfo[];
  next: string | null;
  previous: string | null;
  count: number;
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 100,
  tagTypes: ["AdvertSearch"],
  endpoints: (build) => ({
    getSearchItems: build.query<ISearchItem[], SearchParams>({
      query: ({ searchString, category }) => ({
        url: "search",
        params: { search: searchString, category: category },
        credentials: "include",
      }),
    }),
    getAdvertSearchItems: build.query<
      TransformedAdvertResponse,
      AdvertSearchParams
    >({
      query: ({ category_id, limit, page }) => ({
        url: "advertisements/",
        params: { category_id, limit, page },
        credentials: "include",
      }),
      transformResponse: (
        response: AdvertSearchResponse,
        _,
        { searchString },
      ) => {
        return {
          items: response.results.filter(
            (item) =>
              item.title.toLowerCase().includes(searchString.toLowerCase()) &&
              item.type === "service",
          ),
          next: response.next,
          previous: response.previous,
          count: response.count,
        };

      },
       providesTags: (result, error, arg) => [
        { type: "AdvertSearch", id: arg.category_id ?? "ALL" },
      ],
    }),
  }),
});

export const { useGetSearchItemsQuery, useGetAdvertSearchItemsQuery } =
  searchApi;
