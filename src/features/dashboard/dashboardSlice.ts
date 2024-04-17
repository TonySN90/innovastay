import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getBookingsAfterDate } from "../../services/apiBookings";

export const getArrivalBookingsThunk = createAsyncThunk(
  "dashboard/getArrivalBookingsThunk",
  async ({filterColumn, startFilterDate, endFilterDate}: {startFilterDate: Date, endFilterDate: Date, filterColumn: string}) => {
    const arrivalBookings = await getBookingsAfterDate(filterColumn, startFilterDate, endFilterDate);
    return arrivalBookings;
  }
);

export const getDepartureBookingsThunk = createAsyncThunk(
  "dashboard/getDepartureBookingsThunk",
  async ({filterColumn, startFilterDate, endFilterDate}: {filterColumn: string, startFilterDate: Date, endFilterDate: Date}) => {
    const dapartureBookings = await getBookingsAfterDate(filterColumn, startFilterDate, endFilterDate);
    return dapartureBookings;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    arrivalBookings: [],
    departureBookings: [],
    arrivalLoadingStatus: LoadingTypes.IDLE,
    departureLoadingStatus: LoadingTypes.IDLE,
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
      });
  },
});

export default dashboardSlice.reducer;
export const { setLoadingStatus } = dashboardSlice.actions;
