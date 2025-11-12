import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const newsUpdatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsUpdates: builder.query({
      query: () => ({
        url: API_URLS.NEWS_UPDATES,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.NEWS_UPDATES, id: "LIST" }],
    }),
    addNewsUpdates: builder.mutation({
      query: (body) => ({
        url: API_URLS.NEWS_UPDATES,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.NEWS_UPDATES, id: "LIST" }],
    }),

    updateNewsUpdates: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.NEWS_UPDATES}?id=${body.id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getNewsUpdates", undefined, (draft) => {
            if (!draft?.data) return;
            const embedder = draft.data.find((item) => item.id === id);
            if (embedder) Object.assign(embedder, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: [{ type: RTK_TAGS.NEWS_UPDATES, id: "LIST" }],
    }),
    deleteNewsUpdates: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.NEWS_UPDATES}?id=${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getNewsUpdates", undefined, (draft) => {
            if (!draft?.data) return;
            return null;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: [{ type: RTK_TAGS.NEWS_UPDATES, id: "LIST" }],
    }),
  }),
});

export const {
  useAddNewsUpdatesMutation,
  useUpdateNewsUpdatesMutation,
  useGetNewsUpdatesQuery,
  useDeleteNewsUpdatesMutation,
} = newsUpdatesApi;
