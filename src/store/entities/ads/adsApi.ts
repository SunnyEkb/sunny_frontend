import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";

interface AdImage {
  id: number;
  image: string;
  title_photo: boolean;
}

export interface AdInfo {
  id: number;
  title: string;
  description: string;
  price: string;
  status: number;
  address: string | null;
  condition: string;
  category: number[];
  is_favorited: boolean;
  avg_rating: number | null;
  comments_quantity: number;
  created_at: string;
  title_photo: AdImage;
  comments: [];
  images: AdImage[];
}

export const adsApi = createApi({
  reducerPath: "adsApit",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 100,
  endpoints: (build) => ({
    getAdById: build.query<AdInfo, number>({
      query: (id) => ({
        url: `ads/${id}`,
      }),
    }),
  }),
});

export const { useGetAdByIdQuery } = adsApi;
