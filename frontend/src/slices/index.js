import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import  fetchChannels  from "./channelsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: fetchChannels,
  },
});
