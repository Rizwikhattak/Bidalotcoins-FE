import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Read(LIST)
    getRoles: builder.query({
      query: (params) => ({
        url: API_URLS.ROLES,
        params,
      }),
      providesTags: (result, error, id) =>
        result?.data
          ? [
              { type: RTK_TAGS.ROLES, id: "LIST" },
              ...result.data.map((item) => ({
                type: RTK_TAGS.ROLES,
                id: item?.id,
              })),
            ]
          : { type: RTK_TAGS.ROLES, id: "LIST" },
    }),

    getPermissions: builder.query({
      query: () => API_URLS.PERMISSIONS,
      providesTags: [{ type: RTK_TAGS.PERMISSIONS, id: "LIST" }],
    }),

    //Read (by id)
    getRole: builder.query({
      query: (id) => ({
        url: `${API_URLS.ROLES}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: RTK_TAGS.ROLES, id }],
    }),

    // Create
    addRole: builder.mutation({
      query: (body) => ({
        url: API_URLS.ROLES,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: RTK_TAGS.ROLES, id: "LIST" }],
    }),

    // Update
    updateRole: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.ROLES}?id=${body?.id}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getRoles", undefined, (draft) => {
            if (!draft?.data) return;
            const index = draft?.data?.findIndex((role) => role.id === data.id);
            if (index !== -1)
              draft.data[index] = { ...draft.data[index], ...data };
          })
        );
        const patchItem = dispatch(
          api.util.updateQueryData("getRole", data?.id, (draft) => {
            if (!draft) return;
            // Object.assign(target, source) It merges one object into another — overwriting any matching keys.
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchItem.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: RTK_TAGS.ROLES, id },
        { type: RTK_TAGS.ROLES, id: "LIST" },
      ],
    }),

    // delete
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `${API_URLS.ROLES}?id=${id}`,
        method: "DELETE",
        // body: { id },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          api.util.updateQueryData("getRoles", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter((role) => role.id !== id);
          })
        );
        const patchItem = dispatch(
          api.util.updateQueryData("getRole", id, (draft) => {
            if (!draft) return;
            return null;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
          patchList.undo();
          patchItem.undo();
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: RTK_TAGS.ROLES, id: "LIST" },
        { type: RTK_TAGS.ROLES, id },
      ],
    }),
  }),
});

export const {
  useGetRoleQuery,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} = rolesApi;
