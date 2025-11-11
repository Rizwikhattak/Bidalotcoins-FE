import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const lotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLots: builder.query({
      query: (params) => ({
        url: `${API_URLS.LOTS}?status=${params?.status || "buy now"}`,
      }),
      providesTags: [{ type: RTK_TAGS.LOTS, id: "LIST" }],
    }),
    addLot: builder.mutation({
      query: (body) => ({
        url: API_URLS.LOTS,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.LOTS, id: "LIST" }],
    }),
    updateLot: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.LOTS}?id=${body.id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getLots", undefined, (draft) => {
            if (!draft?.data) return;
            const lot = draft.data.find((item) => item.id === id);
            if (lot) Object.assign(lot, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: [{ type: RTK_TAGS.LOTS, id: "LIST" }],
    }),
    deleteLot: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.LOTS}?id=${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getLots", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((item) => item.id === id);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: [{ type: RTK_TAGS.LOTS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetLotsQuery,
  useAddLotMutation,
  useUpdateLotMutation,
  useDeleteLotMutation,
} = lotsApi;
