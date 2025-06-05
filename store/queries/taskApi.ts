import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import {
  TaskCreateRequest,
  TaskDetailsResponse,
  TaskListResponse,
  TaskUpdateRequest,
  TaskUpdateResponse,
} from "@/types/queries";
import { PaginationQuery, RecordCreated } from "@/types/interfaces";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["TaskModule", "DashboardModule"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
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
    taskList: builder.query<TaskListResponse, PaginationQuery>({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
      providesTags: ["TaskModule"],
    }),
    taskCreate: builder.mutation<RecordCreated, TaskCreateRequest>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TaskModule", "DashboardModule"],
    }),
    taskUpdate: builder.mutation<TaskUpdateResponse, TaskUpdateRequest>({
      query: (data) => ({
        url: `/${data.taskId}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["TaskModule", "DashboardModule"],
    }),
    taskDetails: builder.query<TaskDetailsResponse, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["TaskModule"],
    }),
    taskDelete: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskModule", "DashboardModule"],
    }),
  }),
});

export const {
  useTaskListQuery,
  useTaskDetailsQuery,
  useTaskCreateMutation,
  useTaskUpdateMutation,
  useTaskDeleteMutation,
} = taskApi;
