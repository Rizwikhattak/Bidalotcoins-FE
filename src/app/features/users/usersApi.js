import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Read(LIST)
    // builder.query for GET requests, by default it is get so i dont need to specify the method
    getUsers: builder.query({
      query: (params) => ({
        url: API_URLS.USERS,
        params,
      }),
      providesTags: (result, error, id) =>
        result?.data
          ? [
              { type: RTK_TAGS.USERS, id: "LIST" },
              result?.data?.map((item) => ({
                type: RTK_TAGS.USERS,
                id: item.id,
              })),
            ]
          : { type: RTK_TAGS.USERS, id: "LIST" },
    }),

    //Read (by id)
    getUser: builder.query({
      query: (id) => ({
        url: `${API_URLS.USERS}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: RTK_TAGS.USERS, id }],
    }),

    // create
    addUser: builder.mutation({
      query: (body) => ({
        url: API_URLS.USERS,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.USERS, id: "LIST" }],
    }),
    // update
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${API_URLS.USERS}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: RTK_TAGS.USERS, id },
        { type: RTK_TAGS.USERS, id: "LIST" },
      ],
    }),
    // delete (with optimistic update)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.USERS}/${id}`,
        method: "DELETE",
      }),
      // Optimistically remove from cache, revert if request fails
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // 1) update the list cache
        //You can only change RTK Query’s cache through dispatch, because that’s how Redux works — all state updates go through actions, lets you mutate the cached result of a query directly — synchronously and locally.
        const patchList = dispatch(
          //api.util.updateQueryData(endpointName, queryArg, recipeFn)
          api.util.updateQueryData("getUsers", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((p) => p.id !== id);
          })
        );
        // 2) update the single-item cache
        const patchItem = dispatch(
          api.util.updateQueryData("getUser", id, (draft) => {
            return null;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // revert cache on error
          patchList.undo();
          patchItem.undo();
        }
      },
      // Also invalidate tags to be safe
      invalidatesTags: (result, error, id) => [
        { type: RTK_TAGS.USERS, id: "LIST" },
        { type: RTK_TAGS.USERS, id: "LIST" },
      ],
    }),
  }),
});

// When to use optimistic updates

// Operation	                                       Good candidate?	          Why
// Delete a user	                                      ✅ Yes           	Easy to revert visually
// Rename a product                                    	✅ Yes	           Small local change
// Create new order with server-generated ID          	⚠️ Maybe            You can fake an ID, but must sync after success
// Payment or money transfer	                           ❌ No       	     Risky if rollback is confusing
