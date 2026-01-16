import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../../utils/constans";

const COMMENTS_URL = "/comments";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["COMMENTS", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  keepUnusedDataFor: 1, //1 секунда
  endpoints: (build) => ({
    getComments: build.query({
      query: ({ limit = 15, page = 1, search, typeId, objId }) => ({
        url: `${COMMENTS_URL}/${typeId}/${objId}/`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, args) =>
        result
          ? [
              { type: "COMMENTS", id: JSON.stringify(args) },
              { type: "COMMENTS", id: "PARTIAL-LIST" },
            ]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"],
    }),
  }),
});
