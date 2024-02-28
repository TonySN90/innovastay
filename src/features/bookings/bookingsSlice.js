import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingsView: "schedule",
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    updateBookingsView: (state, action) => {
      state.bookingsView = action.payload;
    },
  },
});

export const { updateBookingsView } = bookingsSlice.actions;
export default bookingsSlice.reducer;
