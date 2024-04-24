import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { IDashboardStateTypes, IFetchPropTypes } from "../../types/DashboardTypes";


const fetchBookings = async ({ filterColumn, startDate, endDate }: IFetchPropTypes) => {
  return await getBookingsAfterDate(filterColumn, startDate, endDate);
};

export const getArrivalBookingsThunk = createAsyncThunk(
  "dashboard/getArrivalBookingsThunk",
  async (params: IFetchPropTypes) => {
    return await fetchBookings(params);
  }
);

export const getDepartureBookingsThunk = createAsyncThunk(
  "dashboard/getDepartureBookingsThunk",
  async (params: IFetchPropTypes) => {
    return await fetchBookings(params);
  }
);

export const getPeriodBookingsThunk = createAsyncThunk(
  "dashboard/getPeriodBookingsThunk",
  async (params: IFetchPropTypes) => {
    return await fetchBookings(params);
  }
);

export const getCreatedBookingsThunk = createAsyncThunk(
  "dashboard/getCreatedBookingsThunk",
  async (params: IFetchPropTypes) => {
    return await fetchBookings(params);
  }
);

export const getRecentGuestsThunk = createAsyncThunk(
  "dashboard/getRecentGuestsThunk",
  async () => {
    return await getBookingsAfterDate();
  }
);


const initialState: IDashboardStateTypes =  {
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
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
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
