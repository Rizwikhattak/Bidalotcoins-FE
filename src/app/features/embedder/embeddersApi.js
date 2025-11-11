import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const embeddersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmbedders: builder.query({
      query: () => ({
        url: API_URLS.EMBEDDER,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.EMBEDDER, id: "LIST" }],
    }),
    addEmbedder: builder.mutation({
      query: (body) => ({
        url: API_URLS.EMBEDDER,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.EMBEDDER, id: "LIST" }],
    }),
    downloadCSV: builder.query({
      query: ({ exportCSV = "CSV" }) => ({
        url: `${API_URLS.EMBEDDER}?export=${exportCSV}`,
      }),
      invalidatesTags: [{ type: RTK_TAGS.EMBEDDER, id: "LIST" }],
    }),
    updateEmbedder: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.EMBEDDER}?id=${body.id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getEmbedders", undefined, (draft) => {
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
      invalidatesTags: [{ type: RTK_TAGS.EMBEDDER, id: "LIST" }],
    }),
    deleteEmbedder: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.EMBEDDER}?id=${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getEmbedders", undefined, (draft) => {
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
      invalidatesTags: [{ type: RTK_TAGS.EMBEDDER, id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmbeddersQuery,
  useAddEmbedderMutation,
  useUpdateEmbedderMutation,
  useDeleteEmbedderMutation,
  useDownloadCSVQuery,
  useLazyDownloadCSVQuery
} = embeddersApi;
