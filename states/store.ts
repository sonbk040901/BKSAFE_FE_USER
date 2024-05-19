import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/booking";
import profileReducer from "./slice/profile";
import socket from "./slice/socket";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    profile: profileReducer,
    socket,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
