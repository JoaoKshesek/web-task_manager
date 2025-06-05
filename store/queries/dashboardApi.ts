import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { DashboardStatsResponse, DashboardUpcomingTaskListResponse } from "@/types/queries";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["DashboardModule"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    dashboardTaskList: builder.query<DashboardUpcomingTaskListResponse, void>({
      query: () => ({
        url: "/upcoming-task-list",
        method: "GET",
      }),
      providesTags: ["DashboardModule"],
    }),
    dashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      providesTags: ["DashboardModule"],
    }),
  }),
});

export const { useDashboardStatsQuery, useDashboardTaskListQuery } = dashboardApi;
