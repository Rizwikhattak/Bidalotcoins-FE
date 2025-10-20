import { API_URLS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";
import { setAuthCredentials } from "./authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //     query: (args) => ({ url, method, body, params }) → how to call your API.
    // providesTags / invalidatesTags → for cache invalidation.
    // transformResponse → shape the response before caching.
    // onQueryStarted → run side effects (we’ll cover below).
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: API_URLS.USER_LOGIN,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthCredentials(data));
        } catch (err) {
          console.log("Login error", err);
        }
      },
    }),
  }),
  overrideExisting: false, //If an endpoint with the same name already exists → keep the old one and ignore the new definition. Useful for production, to avoid accidentally overwriting working endpoints.
});

export const { useLoginUserMutation } = authApi;

// src/features/api/userApi.js
// import { api } from "../../services/baseApi"

// export const userApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // QUERY: Get all users
//     getUsers: builder.query({
//       query: () => ({
//         url: "/users",
//         method: "GET",
//       }),
//       // This tells RTKQ: "this query provides 'Users' data"
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: "Users", id })), // tag each user individually
//               { type: "Users", id: "LIST" }, // tag the whole list
//             ]
//           : [{ type: "Users", id: "LIST" }],
//     }),

//     // MUTATION: Add a new user
//     addUser: builder.mutation({
//       query: (newUser) => ({
//         url: "/users",
//         method: "POST",
//         body: newUser,
//       }),
//       // Lifecycle callback: optimistic update
//       async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
//         // 1. Optimistically update the getUsers cache
//         const patchResult = dispatch(
//           api.util.updateQueryData("getUsers", undefined, (draft) => {
//             draft.push({ ...newUser, id: Date.now() }) // temporary id
//           })
//         )

//         try {
//           // 2. Wait for server response
//           await queryFulfilled
//         } catch {
//           // 3. Roll back if request fails
//           patchResult.undo()
//         }
//       },
//       // After success, refetch the "Users" list if needed
//       invalidatesTags: [{ type: "Users", id: "LIST" }],
//     }),
//   }),
//   overrideExisting: false,
// })

// export const { useGetUsersQuery, useAddUserMutation } = userApi
