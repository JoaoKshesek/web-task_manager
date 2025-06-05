import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../../types/queries";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = authApi;
