import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuestStatesTypes } from "../../types/GuestTypes";
import {
  createUpdateGuest,
  deleteGuest,
  getGuests,
} from "../../services/apiGuests";
import { FormValues } from "../../types/FormTypes";
import { IFilterTypes, LoadingTypes } from "../../types/GlobalTypes";

export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  // @ts-expect-error getState may not be used after optional argument
  async (filter?: IFilterTypes, { getState }) => {
    const { guests } = getState() as {
      guests: IGuestStatesTypes;
    };

    if (
      guests.uploadingStatus === LoadingTypes.SUCCESS ||
      guests.updatingStatus === LoadingTypes.SUCCESS ||
      guests.deletingStatus === LoadingTypes.SUCCESS
    )
      return await getGuests(filter as IFilterTypes);

    // if (guests?.guests.length > 0) {
    //   return guests.guests;
    // }
    return await getGuests(filter as IFilterTypes);
  }
);

export const uploadGuest = createAsyncThunk(
  "guests/uploadGuest",
  async (newGuest: FormValues) => {
    const uploadedGuest = await createUpdateGuest(newGuest);
    return uploadedGuest;
  }
);

export const editGuest = createAsyncThunk(
  "guests/editGuest",
  async ({
    id,
    toUpdatedGuest,
  }: {
    id: number;
    toUpdatedGuest: FormValues;
  }) => {
    const updatedGuest = await createUpdateGuest(toUpdatedGuest, id);
    return updatedGuest;
  }
);

export const deleteGuestThunk = createAsyncThunk(
  "guest/deleteCabin",
  async (cabinId: number) => {
    const deletedGuest = await deleteGuest(cabinId);
    return deletedGuest;
  }
);

const initialState = {
  loadingStatus: "idle",
  uploadingStatus: "idle",
  updatingStatus: "idle",
  deletingStatus: "idle",
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

    resetUpdatingStatus: (state) => {
      state.updatingStatus = "idle";
    },

    resetDeletingStatus: (state) => {
      state.deletingStatus = "idle";
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
      })
      .addCase(editGuest.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(editGuest.fulfilled, (state) => {
        state.updatingStatus = "success";
      })
      .addCase(editGuest.rejected, (state) => {
        state.updatingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Aktualisieren der Gastdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(deleteGuestThunk.pending, (state) => {
        state.deletingStatus = "loading";
      })
      .addCase(deleteGuestThunk.fulfilled, (state) => {
        state.deletingStatus = "success";
      })
      .addCase(deleteGuestThunk.rejected, (state) => {
        state.deletingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Löschen der Gastdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default guestsSlice.reducer;

export const {
  resetUploadingStatus,
  resetDeletingStatus,
  resetUpdatingStatus,
} = guestsSlice.actions;
