import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";
const auctionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query({
      query: () => API_URLS.AUCTIONS,
      providesTags: (result, error, id) =>
        result?.data
          ? [
              { type: RTK_TAGS.AUCTIONS, id: "LIST" },
              ...result.data.map((item) => ({
                type: RTK_TAGS.AUCTIONS,
                id: item?.id,
              })),
            ]
          : [{ type: RTK_TAGS.AUCTIONS, id: "LIST" }],
    }),
    addAuctions: builder.mutation({
      query: (body) => ({
        url: API_URLS.AUCTIONS,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.AUCTIONS, id: "LIST" }],
    }),
    updateAuctions: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${API_URLS.AUCTIONS}?id=${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getAuctions", undefined, (draft) => {
            if (!draft?.data) return;
            const index = draft.data.findIndex((item) => item.id === data.id);
            if (index !== -1) draft.data[index] = data;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
          patchList.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: RTK_TAGS.AUCTIONS, id: "LIST" },
        { type: RTK_TAGS.AUCTIONS, id },
      ],
    }),
    deleteAuctions: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.AUCTIONS}?id=${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getAuctions", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((item) => item.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: RTK_TAGS.AUCTIONS, id: "LIST" },
        { type: RTK_TAGS.AUCTIONS, id },
      ],
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useAddAuctionsMutation,
  useDeleteAuctionsMutation,
  useUpdateAuctionsMutation,
} = auctionsApi;
