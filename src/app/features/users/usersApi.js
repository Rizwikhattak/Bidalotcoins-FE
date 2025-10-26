import { API_URLS, APP_CONSTANTS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

//How RTK Query caches data internally
// RTK Query doesn’t keep one single cache per endpoint — it keeps one cache per endpoint + argument pair.
// if u reload the page then it makes api call again because the cache is in memory only and it gets cleared on page reload
// Question                     	              Answer
// Where is RTKQ cache stored?	              Inside your Redux store → state.api.queries
// Why does it reset on refresh?	            Because Redux store is in-memory, not persisted
// Can it be persisted?             	        Yes, with redux-persist or custom localStorage logic
// Should you persist it?	                     Optional — good for heavy lists, but watch for stale data
// Cache lifetime controls	                  keepUnusedDataFor, refetchOnMountOrArgChange, etc.
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
    //     Two ways to define invalidatesTags
    //     (A) Static array invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    // Used when:
    // You already know exactly which tags to invalidate.
    // The invalidation does not depend on mutation parameters or results.
    // (B) Dynamic function
    // invalidatesTags: (result, error, { id }) => [
    //   { type: 'Product', id },
    //   { type: 'Products', id: 'LIST' },
    // ],
    // Used when:
    // You need to use data from the mutation (like an id or other field).
    // The tags to invalidate depend on the specific mutation’s context.

    // update
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${API_URLS.USERS}?id=${id}`,
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
      // async onQueryStarted(data, { dispatch, queryFulfilled }) data-> is which u passed which u gave as an argument while calling api
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // 1) update the list cache
        //You can only change RTK Query’s cache through dispatch, because that’s how Redux works — all state updates go through actions, lets you mutate the cached result of a query directly — synchronously and locally.
        const patchList = dispatch(
          //api.util.updateQueryData(endpointName, queryArg, recipeFn)
          //Why the second argument is undefined
          // Because when you called your query in the component, you probably did:
          // const { data } = useGetUsersQuery()
          // That means your getUsers query didn’t receive any argument — so its internal cache key argument is undefined.
          // If your query had been something like:
          // useGetUsersQuery({ page: 1 })
          // then you’d have to pass that same argument here:
          // api.util.updateQueryData("getUsers", { page: 1 }, (draft) => { ... })
          // RTK Query uses both the endpoint name and the argument to locate the right cache entry.
          //Draft -> RTK Query internally stores your fetched data in its cache (using Immer, so you can mutate it directly).
          api.util.updateQueryData("getUsers", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((p) => p.id !== id);
          })
        );
        // 2) update the single-item cache
        const patchItem = dispatch(
          api.util.updateQueryData("getUser", id, (draft) => {
            if (!draft) return;
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

    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.DEACTIVATE_USER}?id=${id}`,
        method: "DELETE",
      }),
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const patchList = dispatch(
      //     api.util.updateQueryData("getUsers", undefined, (draft) => {
      //       console.log("DRAAAAAAAFT", draft);
      //       if (!draft?.data) return;
      //       const user = draft.data.find((item) => item.id === id);

      //       if (user) user.status = APP_CONSTANTS.DEACTIVATED_STATUS;
      //     })
      //   );
      //   const patchItem = dispatch(
      //     api.util.updateQueryData("getUser", undefined, (draft) => {
      //       if (!draft.data) return;
      //       const user = draft.data.find((item) => item.id === id);
      //       if (user) user.status = APP_CONSTANTS.DEACTIVATED_STATUS;
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchList.undo();
      //     patchItem.undo();
      //   }
      // },
      invalidatesTags: (result, error, id) => [
        { type: RTK_TAGS.USERS, id },
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
// Payment or money transfer	                          ❌ No       	     Risky if rollback is confusing

// RTK generates two hooks per query
// one for imidietily calling the api once the component mounts e.g useGetUserQuery
// second hook is the lazy version which gives you a trigger function to call the api whenever you want e.g useLazyGetUserQuery its mostly used in loadmore buttons or search boxes

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useDeactivateUserMutation,
  useUpdateUserMutation,
} = usersApi;

// Excellent catch 👀 — that useLazyGetUserQuery (and similar “lazy” hooks) is automatically generated by RTK Query, and it’s extremely useful once you understand when and why to use it.
// Let’s break it down clearly 👇
// 🧠 Normal query vs Lazy query
// When you define a builder.query, RTK Query actually generates two hooks for you:
// Hook	Trigger behavior
// useGetUserQuery(...)	Runs automatically when the component renders.
// useLazyGetUserQuery()	Does not run automatically — you call it manually when you want.
// ✅ Example 1 — Automatic (normal query)
// const { data, isLoading } = useGetUserQuery(5)
// 👉 This will immediately make a network request for /users/5
// as soon as the component mounts (and refetch on certain triggers).
// Great for cases like:

// Pages that should load data immediately (e.g., /users/5 route)

// Always visible lists or dashboards

// ⚡ Example 2 — Manual / Lazy
// const [trigger, { data, isLoading }] = useLazyGetUserQuery()

// // later — e.g. on button click
// const handleClick = () => {
//   trigger(5)   // manually fire the API call now
// }

// This gives you full control over when to call the query.

// Perfect for:

// Search boxes (“fetch when user clicks Search”)

// “Load More” buttons

// When API should be called only after some condition or form submission

// 🧩 What the "lazy" hook returns

// When you call:

// const [trigger, result] = useLazyGetUserQuery()

// you get:

// trigger(arg) → a function that you can call anytime to start the request

// result → same shape as a normal query result (data, isLoading, error, etc.)

// Example:

// const [getUser, { data, isFetching, error }] = useLazyGetUserQuery()

// return (
//   <>
//     <button onClick={() => getUser(42)}>Fetch User 42</button>
//     {isFetching && <p>Loading...</p>}
//     {data && <p>{data.name}</p>}
//   </>
// )
