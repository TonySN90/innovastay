import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCabins } from "../../services/apiCabins";

const fetchCabins = createAsyncThunk("cabins/fetchCabins", async () => {
  const cabins = await getCabins();
  return cabins;
});

const initialState: object = {
  status: "idle",
  error: "",
  cabins: [],
};

const cabinsSlice = createSlice({
  name: "cabins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabins.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCabins.fulfilled, (state, action) => {
        state.status = "idle";
        state.cabins = action.payload;
        console.log(state.cabins);
      })
      .addCase(fetchCabins.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default cabinsSlice.reducer;
