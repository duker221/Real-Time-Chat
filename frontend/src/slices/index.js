import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import channelsReducer from "./channelsSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    message: messageReducer,
  },
});
