import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/bookings/bookingsSlice";
import cabinsReducer from "./features/cabins/cabinsSlice";
import guestsReducer from "./features/guests/guestsSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import authReducer from "./features/authentication/authSlice";

const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    cabins: cabinsReducer,
    guests: guestsReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export default store;
