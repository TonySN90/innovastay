import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { IDashboardStateTypes } from "../../types/DashboardTypes";


export const getArrivalBookingsThunk = createAsyncThunk(
  "dashboard/getArrivalBookingsThunk",
  async ({filterColumn, startDate, endDate}: IDashboardStateTypes) => {
    const arrivalBookings = await getBookingsAfterDate(filterColumn, startDate, endDate);
    return arrivalBookings;
  }
);

export const getDepartureBookingsThunk = createAsyncThunk(
  "dashboard/getDepartureBookingsThunk",
  async ({filterColumn, startDate, endDate}: IDashboardStateTypes) => {
    const dapartureBookings = await getBookingsAfterDate(filterColumn, startDate, endDate);
    return dapartureBookings;
  }
);

export const getPeriodBookingsThunk = createAsyncThunk(
  "dashboard/getPeriodBookingsThunk",
  async ({filterColumn, startDate, endDate}: IDashboardStateTypes) => {
    const periodBookings = await getBookingsAfterDate(filterColumn, startDate, endDate);
    return periodBookings;
  }
);
export const getCreatedBookingsThunk = createAsyncThunk(
  "dashboard/getCreatedBookingsThunk",
  async ({filterColumn, startDate, endDate}: IDashboardStateTypes) => {
    const createdBookings = await getBookingsAfterDate(filterColumn, startDate, endDate);
    return createdBookings;
  }
);

export const getRecentGuestsThunk = createAsyncThunk(
  "dashboard/getRecentGuestsThunk",
  async () => {
    const recentGuests = await getBookingsAfterDate();
    return recentGuests;
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    arrivalBookings: [],
    departureBookings: [],
    recentGuests: [],
    periodBookings: [],
    createdBookings: [],

    arrivalLoadingStatus: LoadingTypes.IDLE,
    departureLoadingStatus: LoadingTypes.IDLE,
    guestsLoadingStatus: LoadingTypes.IDLE,
    periodBookingsLoadingStatus: LoadingTypes.IDLE,
    createdBookingsLoadingStatus: LoadingTypes.IDLE,
  },
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingTypes>) => {
      state.arrivalLoadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // Arrival
      .addCase(getArrivalBookingsThunk.pending, (state) => {
        state.arrivalLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getArrivalBookingsThunk.fulfilled, (state, action) => {
        state.arrivalLoadingStatus = LoadingTypes.IDLE;
        state.arrivalBookings = action.payload;
      })
      .addCase(getArrivalBookingsThunk.rejected, (state) => {
        state.arrivalLoadingStatus = LoadingTypes.ERROR;
      })
    // Departure
      .addCase(getDepartureBookingsThunk.pending, (state) => {
        state.departureLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getDepartureBookingsThunk.fulfilled, (state, action) => {
        state.departureLoadingStatus = LoadingTypes.IDLE;
        state.departureBookings = action.payload;
      })
      .addCase(getDepartureBookingsThunk.rejected, (state) => {
        state.departureLoadingStatus = LoadingTypes.ERROR;
      })
    // recent Guests
      .addCase(getRecentGuestsThunk.pending, (state) => {
        state.guestsLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getRecentGuestsThunk.fulfilled, (state, action) => {
        state.guestsLoadingStatus = LoadingTypes.IDLE;
        state.recentGuests = action.payload;
      })
      .addCase(getRecentGuestsThunk.rejected, (state) => {
        state.guestsLoadingStatus = LoadingTypes.ERROR;
      })
    // period Bookings
      .addCase(getPeriodBookingsThunk.pending, (state) => {
        state.periodBookingsLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getPeriodBookingsThunk.fulfilled, (state, action) => {
        state.periodBookingsLoadingStatus = LoadingTypes.SUCCESS;
        state.periodBookings = action.payload;
      })
      .addCase(getPeriodBookingsThunk.rejected, (state) => {
        state.periodBookingsLoadingStatus = LoadingTypes.ERROR;
      })
    // created Bookings
      .addCase(getCreatedBookingsThunk.pending, (state) => {
        state.createdBookingsLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getCreatedBookingsThunk.fulfilled, (state, action) => {
        state.createdBookingsLoadingStatus = LoadingTypes.SUCCESS;
        state.createdBookings = action.payload;
      })
      .addCase(getCreatedBookingsThunk.rejected, (state) => {
        state.createdBookingsLoadingStatus = LoadingTypes.ERROR;
      });
  },
});

export default dashboardSlice.reducer;
export const { setLoadingStatus } = dashboardSlice.actions;
