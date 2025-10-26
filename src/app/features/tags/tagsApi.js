import { API_URLS, RTK_TAGS } from "../../../utils/Constants.js";
import { api } from "../../services/baseApi.js";

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => API_URLS.TAGS,
      providesTags: (result, error, id) =>
        result?.data
          ? [
              { type: RTK_TAGS.TAGS, id: "LIST" },
              ...result.data.map(({ id }) => ({ type: RTK_TAGS.TAGS, id })),
            ]
          : [{ type: RTK_TAGS.TAGS, id: "LIST" }],
    }),
    getTag: builder.query({
      query: (id) => `${API_URLS.TAGS}/${id}`,
      providesTags: (result, error, id) => [{ type: RTK_TAGS.TAGS, id: id }],
    }),
    addTag: builder.mutation({
      query: (body) => ({
        url: API_URLS.TAGS,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.TAGS, id: "LIST" }],
    }),
    updateTag: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${API_URLS.TAGS}?id=${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTags", undefined, (draft) => {
            if (!draft?.data) return;
            const index = draft?.data?.findIndex((role) => role.id === data.id);
            if (index !== -1)
              draft.data[index] = { ...draft.data[index], ...data };
          })
        );
        const patchItem = dispatch(
          api.util.updateQueryData("getTag", data?.id, (draft) => {
            if (draft) return;
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
          patchResult.undo();
          patchItem.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: RTK_TAGS.TAGS, id: "LIST" },
        { type: RTK_TAGS.TAGS, id: id },
      ],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.TAGS}?id=${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getTags", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((item) => item.id !== id);
          })
        );

        const patchItem = dispatch(
          api.util.updateQueryData("getTag", id, (draft) => {
            if (!draft) return;
            return null;
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchItem.undo();
          patchList.undo();
          console.error(err);
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: RTK_TAGS.TAGS, id: "LIST" },
        { type: RTK_TAGS.TAGS, id },
      ],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;
