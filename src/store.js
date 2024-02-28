import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/bookings/bookingsSlice";
import cabinsReducer from "./features/cabins/cabinsSlice";

const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    cabins: cabinsReducer,
    // bookingsView: bookingsViewReducer,
  },
});

export default store;
