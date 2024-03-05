import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCabins } from "../../services/apiCabins";
import { ICabinStatesTypes, ICabinTypes } from "../../types/cabinTypes";

export const fetchCabins = createAsyncThunk(
  "cabins/fetchCabins",
  async (_, { getState }) => {
    const { cabins } = getState() as {
      cabins: { cabins: ICabinTypes[] };
    };
    if (cabins?.cabins.length > 0) {
      return cabins.cabins;
    }

    const newCabins = await getCabins();
    return newCabins;
  }
);

const initialState = {
  status: "idle",
  error: "",
  cabins: [],
} as ICabinStatesTypes;

const cabinsSlice = createSlice({
  name: "cabins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCabins.fulfilled, (state, action) => {
        state.status = "idle";
        state.cabins = action.payload;
      })
      .addCase(fetchCabins.rejected, (state) => {
        state.status = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default cabinsSlice.reducer;
