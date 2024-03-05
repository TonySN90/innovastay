import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BookingsViewType,
  IBookingStateTypes,
  IBookingTypes,
} from "../../types/BookingTypes";
import { getBookings } from "../../services/apiBookings";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { getState }) => {
    const { bookings } = getState() as {
      bookings: { bookings: IBookingTypes[] };
    };
    if (bookings?.bookings.length > 0) {
      return bookings.bookings;
    }

    const newBookings = await getBookings();
    return newBookings;
  }
);

const initialState: IBookingStateTypes = {
  bookingsView: BookingsViewType.schedule,
  status: "idle",
  error: "",
  bookings: [],
} as IBookingStateTypes;

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    updateBookingsView: (state, action: PayloadAction<BookingsViewType>) => {
      state.bookingsView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "idle";
        state.bookings = action.payload || [];
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Buchungsdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export const { updateBookingsView } = bookingsSlice.actions;
export default bookingsSlice.reducer;
