import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCabin, getCabins, updateCabin } from "../../services/apiCabins";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import { StatusTypes } from "../../types/GlobalTypes";
import { FormValues } from "../../types/FormTypes";

export const fetchCabins = createAsyncThunk(
  "cabins/fetchCabins",
  async (_, { getState }) => {
    const { cabins } = getState() as {
      cabins: ICabinStatesTypes;
    };

    if (cabins.uploadingStatus === StatusTypes.SUCCESS)
      return await getCabins();
    if (cabins?.cabins.length > 0) return cabins.cabins;

    return await getCabins();
  }
);

export const uploadCabin = createAsyncThunk(
  "cabins/uploadCabin",
  async (newCabin: FormValues) => {
    const uploadedCabin = await createCabin(newCabin);
    return uploadedCabin;
  }
);

export const editCabin = createAsyncThunk(
  "cabins/editCabin",
  async ({ id, toUpdatedCabin }) => {
    console.log(toUpdatedCabin, id);

    const updatedCabin = await updateCabin(id, toUpdatedCabin);
    return updatedCabin;
  }
);

const initialState = {
  loadingStatus: "idle",
  uploadingStatus: "idle",
  updatingStatus: "idle",
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

    resetUpdatingStatus: (state) => {
      state.updatingStatus = "idle";
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
      })
      .addCase(editCabin.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(editCabin.fulfilled, (state) => {
        state.updatingStatus = "success";
      })
      .addCase(editCabin.rejected, (state) => {
        state.updatingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Aktualisieren der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default cabinsSlice.reducer;
export const { resetStatus, resetUpdatingStatus } = cabinsSlice.actions;
