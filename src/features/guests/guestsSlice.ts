import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import { createUpdateGuest, getGuests } from "../../services/apiGuests";
import { FormValues } from "../../types/FormTypes";
import { StatusTypes } from "../../types/GlobalTypes";

export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  async (_, { getState }) => {
    const { guests } = getState() as {
      guests: IGuestStatesTypes;
    };

    if (guests.uploadingStatus === StatusTypes.SUCCESS)
      return await getGuests();

    if (guests?.guests.length > 0) {
      return guests.guests;
    }
    return await getGuests();
  }
);

export const uploadGuest = createAsyncThunk(
  "guests/uploadGuest",
  async (newGuest: FormValues) => {
    const uploadedGuest = await createUpdateGuest(newGuest);
    return uploadedGuest;
  }
);

const initialState = {
  loadingStatus: "idle",
  uploadingStatus: "idle",
  error: "",
  guests: [],
} as IGuestStatesTypes;

const guestsSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    resetUploadingStatus: (state) => {
      state.uploadingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Gastdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(uploadGuest.pending, (state) => {
        state.uploadingStatus = "loading";
      })
      .addCase(uploadGuest.fulfilled, (state) => {
        state.uploadingStatus = "success";
      })
      .addCase(uploadGuest.rejected, (state) => {
        state.uploadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Erstellen der Gastdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default guestsSlice.reducer;

export const { resetUploadingStatus } = guestsSlice.actions;
