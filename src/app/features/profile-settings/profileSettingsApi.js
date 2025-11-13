import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const profileSettingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalSettings: builder.query({
      query: () => ({
        url: API_URLS.PERSONAL_SETTINGS,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.PERSONAL_SETTINGS, id: "LIST" }],
    }),
    updatePersonalSettings: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.PERSONAL_SETTINGS}?id=${body.id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: RTK_TAGS.PERSONAL_SETTINGS, id: "LIST" }],
    }),
    getBusinessSettings: builder.query({
      query: () => ({
        url: API_URLS.BUSINESS_SETTINGS,
        method: "GET",
      }),
      providesTags: [{ type: RTK_TAGS.BUSINESS_SETTINGS, id: "LIST" }],
    }),
    updateBusinessSettings: builder.mutation({
      query: (body) => ({
        url: `${API_URLS.BUSINESS_SETTINGS}?id=${body.id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [{ type: RTK_TAGS.BUSINESS_SETTINGS, id: "LIST" }],
    }),
  }),
});

export const {
  useGetPersonalSettingsQuery,
  useUpdatePersonalSettingsMutation,
  useGetBusinessSettingsQuery,
  useUpdateBusinessSettingsMutation,
} = profileSettingsApi;
