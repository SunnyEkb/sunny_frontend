import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";

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
  img?: string;
  title_photo?: {
    id: number;
    image: string;
    title_photo: boolean;
  };
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 100,
  endpoints: (build) => ({
    getSearchItems: build.query<ISearchItem[], string>({
      query: (serchString: string) => ({
        url: `search?search=${serchString}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetSearchItemsQuery } = searchApi;
