import { API_URLS, RTK_TAGS } from "../../../utils/Constants";
import { api } from "../../services/baseApi";

const commonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: API_URLS.COUNTRIES,
        method: "GET",
      }),
      providesTags: [{ id: RTK_TAGS.COUNTRY, type: "LIST" }],
    }),
  }),
});

export const { useGetCountriesQuery } = commonApi;
