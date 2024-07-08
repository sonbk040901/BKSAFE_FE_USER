import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/booking";
import driver from "./slice/driver";
import registerDriver from "./slice/driverRegister";
import profileReducer from "./slice/profile";
import rating from "./slice/rating";
import socket from "./slice/socket";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    profile: profileReducer,
    socket,
    rating,
    driver,
    registerDriver,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
