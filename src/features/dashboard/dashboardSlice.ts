import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingTypes } from "../../types/GlobalTypes";
import { getBookingsAfterDate } from "../../services/apiBookings";

export const getBookingsAfterDateThunk = createAsyncThunk(
  "dashboard/getBookingsAfterDateThunk",
  async (date: Date) => {
    const recentBookings = await getBookingsAfterDate(date);
    return recentBookings;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    recentBookings: [],
    loadingStatus: LoadingTypes.IDLE,
  },
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingTypes>) => {
      state.loadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingsAfterDateThunk.pending, (state) => {
        state.loadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getBookingsAfterDateThunk.fulfilled, (state, action) => {
        state.loadingStatus = LoadingTypes.IDLE;
        state.recentBookings = action.payload;
      })
      .addCase(getBookingsAfterDateThunk.rejected, (state) => {
        state.loadingStatus = LoadingTypes.ERROR;
      });
  },
});

export default dashboardSlice.reducer;
export const { setLoadingStatus } = dashboardSlice.actions;
