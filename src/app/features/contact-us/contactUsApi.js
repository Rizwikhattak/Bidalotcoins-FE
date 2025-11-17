import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const contactUsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContactUs: builder.query({
      query: () => ({
        url: API_URLS.CONTACT_US,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.CONTACT_US, id: "LIST" }],
    }),
    addCOntactUs: builder.mutation({
      query: (body) => ({
        url: API_URLS.CONTACT_US,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.CONTACT_US, id: "LIST" }],
    }),

    updateContactUs: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.CONTACT_US}?id=${body.id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getContactUs", undefined, (draft) => {
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
      invalidatesTags: [{ type: RTK_TAGS.CONTACT_US, id: "LIST" }],
    }),
    deleteContactUs: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.CONTACT_US}?id=${id}`,
        method: "DELETE",
      }),
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const patchList = dispatch(
      //     api.util.updateQueryData("getContactUs", undefined, (draft) => {
      //       if (!draft?.data) return;
      //       return draft?.data?.filter((item) => item?.id !== id);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (err) {
      //     patchList.undo();
      //     console.error(err);
      //   }
      // },
      invalidatesTags: [{ type: RTK_TAGS.CONTACT_US, id: "LIST" }],
    }),
  }),
});

export const {
  useGetContactUsQuery,
  useAddCOntactUsMutation,
  useUpdateContactUsMutation,
  useDeleteContactUsMutation,
} = contactUsApi;
