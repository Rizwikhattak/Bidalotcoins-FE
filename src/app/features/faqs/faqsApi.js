import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const faqsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: API_URLS.FAQS,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.FAQS, id: "LIST" }],
    }),
    addFaqs: builder.mutation({
      query: (body) => ({
        url: API_URLS.FAQS,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.FAQS, id: "LIST" }],
    }),

    updateFaqs: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.FAQS}?id=${body.id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getFaqs", undefined, (draft) => {
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
      invalidatesTags: [{ type: RTK_TAGS.FAQS, id: "LIST" }],
    }),
    deleteFaqs: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.FAQS}?id=${id}`,
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
      invalidatesTags: [{ type: RTK_TAGS.FAQS, id: "LIST" }],
    }),
  }),
});

export const {
  useAddFaqsMutation,
  useUpdateFaqsMutation,
  useGetFaqsQuery,
  useDeleteFaqsMutation,
} = faqsApi;
