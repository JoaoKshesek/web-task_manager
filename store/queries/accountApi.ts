import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { AccountDetailsResponse, AccountUpdateRequest, AccountUpdateResponse } from "../../types/queries";

export const accountApi = createApi({
  reducerPath: "accountApi",
  tagTypes: ["AccountModule"],
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/account`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    accountDetails: builder.query<AccountDetailsResponse, void>({
      query: () => ({
        url: "/details",
        method: "GET",
      }),
      providesTags: ["AccountModule"],
    }),
    accountUpdate: builder.mutation<AccountUpdateResponse, AccountUpdateRequest>({
      query: (data) => ({
        url: "/update",
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["AccountModule"],
    }),
    accountDelete: builder.mutation<void, void>({
      query: () => ({
        url: `/remove`,
        method: "DELETE",
      }),
      invalidatesTags: ["AccountModule"],
    }),
  }),
});

export const { useAccountDetailsQuery, useAccountUpdateMutation, useAccountDeleteMutation } = accountApi;
