import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getBookingsAfterDate } from "../../services/apiBookings";
import {
  IDashboardStateTypes,
  IFetchPropTypes,
  ITodayCardBookingTypes,
} from "../../types/DashboardTypes";
import { getPastDay, getToday } from "../../utils/datesHelper";
import moment from "moment";

const fetchBookings = async ({
  filterColumn,
  startDate,
  endDate,
}: IFetchPropTypes) => {
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
  async (params: IFetchPropTypes, { dispatch }) => {
    const periodBookings = await fetchBookings(params);

    // Calculate Sales
    calcDaysSales(periodBookings, dispatch);

    return periodBookings;
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

const initialState: IDashboardStateTypes = {
  arrivalBookings: [],
  departureBookings: [],
  recentGuests: [],
  periodBookings: [],
  createdBookings: [],
  sevenDaysSales: [],
  thirtyDaysSales: [],
  ninetyDaysSales: [],

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

    setDaysSales: (state, action: PayloadAction<object>) => {
      // set seven days sales

      const key = +Object.keys(action.payload)[0];
      const values = Object.values(action.payload)[0];

      if (key === 7) state.sevenDaysSales = values;
      if (key === 30) state.thirtyDaysSales = values;
      if (key === 90) state.ninetyDaysSales = values;

      state.periodBookingsLoadingStatus = LoadingTypes.SUCCESS;
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
        // state.periodBookingsLoadingStatus = LoadingTypes.SUCCESS;
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
export const { setLoadingStatus, setDaysSales } = dashboardSlice.actions;

// Calc functions
const calcSales = (bookings: ITodayCardBookingTypes[]) => {
  const salesDataMap = new Map();

  bookings.forEach((booking) => {
    const date = moment(booking.startDate).format("DD. MMMM");

    if (salesDataMap.has(date)) {
      salesDataMap.get(date).sales += booking.totalPrice;
    } else {
      salesDataMap.set(date, { date: date, sales: booking.totalPrice });
    }
  });

  return Array.from(salesDataMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

function filterBookings(
  bookings: ITodayCardBookingTypes[],
  startDate: Date,
  endDate: Date
) {
  return bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    return (
      bookingDate.getTime() >= startDate.getTime() &&
      bookingDate.getTime() <= endDate.getTime()
    );
  });
}

function calcDaysSales(
  periodBookings: ITodayCardBookingTypes[],
  dispatch: Dispatch
) {
  const endDate = new Date(getToday({ end: true }));

  const sevenDayBookings = filterBookings(
    periodBookings,
    new Date(getPastDay("7")),
    endDate
  );
  const thirtyDayBookings = filterBookings(
    periodBookings,
    new Date(getPastDay("30")),
    endDate
  );
  const ninetyDayBookings = filterBookings(
    periodBookings,
    new Date(getPastDay("90")),
    endDate
  );

  const sevenDaysSales = { 7: calcSales(sevenDayBookings) };
  const thirtyDaysSales = { 30: calcSales(thirtyDayBookings) };
  const ninetyDaysSales = { 90: calcSales(ninetyDayBookings) };

  dispatch(setDaysSales(sevenDaysSales));
  dispatch(setDaysSales(thirtyDaysSales));
  dispatch(setDaysSales(ninetyDaysSales));
}
