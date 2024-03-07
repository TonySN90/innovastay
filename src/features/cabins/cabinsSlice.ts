import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCabin, getCabins } from "../../services/apiCabins";
import { ICabinStatesTypes, ICabinTypes } from "../../types/cabinTypes";
import { StatusTypes } from "../../types/GlobalTypes";

export const fetchCabins = createAsyncThunk(
  "cabins/fetchCabins",
  async (_, { getState }) => {
    const { cabins } = getState() as {
      cabins: { cabins: ICabinTypes[] };
    };

    if (cabins.uploadingStatus === StatusTypes.SUCCESS)
      return await getCabins();
    if (cabins?.cabins.length > 0) return cabins.cabins;

    return await getCabins();
  }
);

export const uploadCabin = createAsyncThunk(
  "cabins/uploadCabin",
  async (newCabin) => {
    const uploadedCabin = await createCabin(newCabin);
    return uploadedCabin;
  }
);

const initialState = {
  loadingStatus: "idle",
  uploadingStatus: "idle",
  error: "",
  cabins: [],
} as ICabinStatesTypes;

const cabinsSlice = createSlice({
  name: "cabins",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.uploadingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabins.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchCabins.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.cabins = action.payload;
      })
      .addCase(fetchCabins.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Zimmerdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(uploadCabin.pending, (state) => {
        state.uploadingStatus = "loading";
      })
      .addCase(uploadCabin.fulfilled, (state) => {
        state.uploadingStatus = "success";
      })
      .addCase(uploadCabin.rejected, (state) => {
        state.uploadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Erstellen der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default cabinsSlice.reducer;
export const { resetStatus } = cabinsSlice.actions;
