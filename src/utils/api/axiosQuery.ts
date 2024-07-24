import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { retry, type BaseQueryFn, BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "../../store/store";


//узнать BASE_URL у беков
const BASE_URL = "https://sunnyekb.ru/api/v1";


interface AxiosQueryParams {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "OPTIONS";
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
}

const withBailOutRetryCallback = (
  queryFn: BaseQueryFn<AxiosQueryParams, unknown, AxiosBaseQueryError>,
) => {
  return async (
    args: AxiosQueryParams,
    api: BaseQueryApi,
    //добавить правило в eslint, чтобы на any не ругался
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraOptions: any,
  ) => {
    const result = await queryFn(args, api, extraOptions);
    if (result.error?.status === 401) {
      retry.fail(result.error);
    }

    return result;
  };
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: BASE_URL },
  ): BaseQueryFn<AxiosQueryParams, unknown, AxiosBaseQueryError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const axiosAuthorizedBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: BASE_URL },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method, data, params, headers }, { getState }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${(getState() as RootState).auth.token}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const axiosStaggeredBaseQuery = retry(
  withBailOutRetryCallback(axiosBaseQuery()),
  {
    maxRetries: 3,
  },
);

export const axiosStaggeredAuthorizedBaseQuery = retry(
  withBailOutRetryCallback(axiosAuthorizedBaseQuery()),
  {
    maxRetries: 3,
  },
);
