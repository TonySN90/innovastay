import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsStateTypes, BookingsViewType } from "../../types/BookingTypes";

const initialState: BookingsStateTypes = {
  bookingsView: BookingsViewType.schedule,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    updateBookingsView: (state, action: PayloadAction<BookingsViewType>) => {
      state.bookingsView = action.payload;
    },
  },
});

export const { updateBookingsView } = bookingsSlice.actions;
export default bookingsSlice.reducer;
