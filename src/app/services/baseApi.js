import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URLS } from "../../utils/Constants";
import { logout, setAuthCredentials } from "../features/auth/authSlice";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/";

// fetch base query is a wrapper around fetch that converts args into HTTP request like:
//args.url → endpoint path
// args.method → GET/POST/PATCH/DELETE
// args.body → JSON body
// prepareHeaders → add Authorization token, etc.
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");
    return headers;
  },
});

// A custom baseQuery to handle token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  // if the token is expired then this logic
  if (result?.error?.status === 401) {
    // call the refresh api and get a new token
    const refreshResult = await rawBaseQuery(
      {
        url: API_URLS.REFRESH_TOKEN,
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshResult?.data?.access_token) {
      // if success then set credentials and call the original qurry/api with new access token
      api.dispatch(
        setAuthCredentials({
          user: refreshResult?.data?.user,
          access_token: refreshResult?.data?.access_token,
        })
      );
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: () => ({}),
});
