import { createSlice } from "@reduxjs/toolkit";
import { APP_CONSTANTS } from "../../../utils/Constants";

const initialState = {
  data: localStorage.getItem(APP_CONSTANTS.USER_CREDENTIALS)
    ? JSON.parse(localStorage.getItem(APP_CONSTANTS.USER_CREDENTIALS))
    : null,
  access_token: localStorage.getItem(APP_CONSTANTS.ACCESS_TOKEN) || null,
  refresh_token: localStorage.getItem(APP_CONSTANTS.REFRESH_TOKEN) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthCredentials: (state, action) => {
      const { access_token, refresh_token, ...user } = action.payload.data;
      state.data = user;
      state.access_token = access_token || null;
      state.refresh_token = refresh_token || null;
      if (access_token)
        localStorage.setItem(APP_CONSTANTS.ACCESS_TOKEN, access_token);
      if (refresh_token)
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN, refresh_token);
      if (user)
        localStorage.setItem(
          APP_CONSTANTS.USER_CREDENTIALS,
          JSON.stringify(user)
        );
    },
    logout: (state) => {
      state.data = null;
      state.access_token = null;
      state.refresh_token = null;
      localStorage.removeItem(APP_CONSTANTS.ACCESS_TOKEN);
      localStorage.removeItem(APP_CONSTANTS.REFRESH_TOKEN);
    },
  },
});

export const { setAuthCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
