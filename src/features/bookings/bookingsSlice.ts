import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BookingsViewType,
  IBookingStateTypes,
  IBookingTypes,
} from "../../types/BookingTypes";
import {
  createUpdateBooking,
  deleteBooking,
  getBooking,
  getBookings,
} from "../../services/apiBookings";
import { FormValues } from "../../types/FormTypes";
import { LoadingTypes } from "../../types/GlobalTypes";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (filter: { field: string; value: string }, { getState }) => {
    const { bookings } = getState() as {
      bookings: IBookingStateTypes;
    };

    if (
      bookings.uploadingStatus === LoadingTypes.SUCCESS ||
      bookings.updatingStatus === LoadingTypes.SUCCESS ||
      bookings.deletingStatus === LoadingTypes.SUCCESS
    )
      return await getBookings(filter);

    // if (bookings?.bookings.length > 0) {
    //   return bookings.bookings;
    // }

    const newBookings = await getBookings(filter);
    return newBookings;
  }
);

export const getBookingThunk = createAsyncThunk(
  "bookings/getBooking",
  async (bookingId: number) => {
    const booking = await getBooking(bookingId);
    return booking;
  }
);

export const uploadBookingThunk = createAsyncThunk(
  "bookings/uploadBooking",
  async (newBooking: FormValues) => {
    const uploadedBooking = await createUpdateBooking(newBooking);
    return uploadedBooking;
  }
);

export const updateBookingThunk = createAsyncThunk(
  "bookings/updateBooking",
  async ({
    id,
    toUpdatedBooking,
  }: {
    id: number;
    toUpdatedBooking: FormValues;
  }) => {
    const updatedBooking = await createUpdateBooking(toUpdatedBooking, id);
    return updatedBooking;
  }
);

export const deleteBookingThunk = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId: number) => {
    const deletedBooking = await deleteBooking(bookingId);
    return deletedBooking;
  }
);

const initialState: IBookingStateTypes = {
  bookingsView: BookingsViewType.schedule,
  loadingStatus: "idle",
  uploadingStatus: "idle",
  updatingStatus: "idle",
  deletingStatus: "idle",
  error: "",
  bookings: [],
  booking: {} as IBookingTypes,
  selectedFilter: "all",
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    updateBookingsView: (state, action: PayloadAction<BookingsViewType>) => {
      state.bookingsView = action.payload;
    },

    resetUploadingStatus: (state) => {
      state.uploadingStatus = "idle";
    },

    resetUpdatingStatus: (state) => {
      state.updatingStatus = "idle";
    },

    resetDeletingStatus: (state) => {
      state.deletingStatus = "idle";
    },

    setBookings: (state, action: PayloadAction<IBookingTypes[]>) => {
      state.bookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.bookings = action.payload || [];
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Buchungsdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(getBookingThunk.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(getBookingThunk.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.booking = action.payload;
      })
      .addCase(getBookingThunk.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Buchungsdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(uploadBookingThunk.fulfilled, (state) => {
        state.uploadingStatus = "success";
      })
      .addCase(uploadBookingThunk.rejected, (state) => {
        state.uploadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Erstellen der Buchungsdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(updateBookingThunk.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(updateBookingThunk.fulfilled, (state) => {
        state.updatingStatus = "success";
      })
      .addCase(updateBookingThunk.rejected, (state) => {
        state.updatingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Aktualisieren der Buchungsdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(deleteBookingThunk.pending, (state) => {
        state.deletingStatus = "loading";
      })
      .addCase(deleteBookingThunk.fulfilled, (state) => {
        state.deletingStatus = "success";
      })
      .addCase(deleteBookingThunk.rejected, (state) => {
        state.deletingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Löschen der Buchungsdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export const {
  updateBookingsView,
  resetUploadingStatus,
  resetDeletingStatus,
  resetUpdatingStatus,
  setBookings,
} = bookingsSlice.actions;
export default bookingsSlice.reducer;
