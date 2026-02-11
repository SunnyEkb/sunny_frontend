import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../utils/constans";

interface BaseResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface AdImage {
  id: number;
  image: string;
  title_photo: boolean;
}

export interface AdInfo {
  id: number;
  title: string;
  type: "ad";
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
  tagTypes: ["Ads", "UNAUTHORIZED", "UNKNOWN_ERROR", "Favorite"],
  endpoints: (build) => ({
    getAdById: build.query<AdInfo, number>({
      query: (id) => ({
        url: `ads/${id}`,
      }),
    }),
    getAllAds: build.query<
      BaseResponse<AdInfo>,
      { category_id?: number; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: `advertisements/`,
        credentials: 'include',
        params,
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ previousArg, currentArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.category_id !== previousArg?.category_id,
      merge: (currentData, newData) => {
        return {
          ...newData,
          results: [...currentData.results, ...newData.results],
        };
      },
    }),
    addCommentAds: build.mutation({
      query: (data: { id: string; feedback: string; rating: number }) => ({
        url: `/ads/${data.id}/add-comment/`,
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Ads", id: "PARTIAL-LIST" }],
    }),
    addToFavoritesAds: build.mutation({
      query: ({ type, id }:     { type: "ad" | "service"; id: number }) => ({
        url: `/${type + "s"}/${id}/add-to-favorites/`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted({id}, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adsApi.util.updateQueryData("getAllAds", {}, (draft) => {
            const ad = draft.results.find((item) => item.id === id);
            if (ad) {
              ad.is_favorited = true;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteToFavoritesAds: build.mutation({
      query: ( { type, id }:  { type: "ad" | "service"; id: number }) => ({
        url: `/${type + "s"}/${id}/delete-from-favorites/`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted({id}, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adsApi.util.updateQueryData("getAllAds", {}, (draft) => {
            const ad = draft.results.find((item) => item.id === id);
            if (ad) {
              ad.is_favorited = false;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAdByIdQuery,
  useGetAllAdsQuery,
  useAddCommentAdsMutation,
  useAddToFavoritesAdsMutation,
  useDeleteToFavoritesAdsMutation,
} = adsApi;
