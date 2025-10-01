import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { api } from "./services/baseApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
