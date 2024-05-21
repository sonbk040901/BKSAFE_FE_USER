import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/booking";
import profileReducer from "./slice/profile";
import socket from "./slice/socket";
import rating from "./slice/rating";
import driver from "./slice/driver";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    profile: profileReducer,
    socket,
    rating,
    driver,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
